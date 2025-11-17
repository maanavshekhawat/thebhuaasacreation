package com.clothing.ecommerce.service;

import com.clothing.ecommerce.dto.CreateOrderRequest;
import com.clothing.ecommerce.dto.PaymentVerificationRequest;
import com.clothing.ecommerce.model.Order;
import com.clothing.ecommerce.model.OrderItem;
import com.clothing.ecommerce.repository.OrderItemRepository;
import com.clothing.ecommerce.repository.OrderRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PaymentService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Value("${razorpay.key.id:rzp_test_YOUR_KEY_ID}")
    private String razorpayKeyId;
    
    @Value("${razorpay.key.secret:YOUR_SECRET_KEY}")
    private String razorpayKeySecret;
    
    public OrderResponse createOrder(CreateOrderRequest request) throws RazorpayException {
        // Validate Razorpay keys
        if (razorpayKeyId == null || razorpayKeyId.equals("rzp_test_YOUR_KEY_ID") || 
            razorpayKeySecret == null || razorpayKeySecret.equals("YOUR_SECRET_KEY")) {
            throw new RuntimeException("Razorpay keys are not configured. Please update application.properties with your Razorpay API keys.");
        }
        
        RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        
        // Create order in Razorpay
        JSONObject orderRequest = new JSONObject();
        // Amount in paise (multiply by 100)
        int amountInPaise = request.getAmount().multiply(new BigDecimal("100")).intValue();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt_" + System.currentTimeMillis());
        
        com.razorpay.Order razorpayOrder = razorpay.orders.create(orderRequest);
        
        // Save order in database
        com.clothing.ecommerce.model.Order order = new com.clothing.ecommerce.model.Order();
        order.setUserId(request.getUserId());
        order.setTotalAmount(request.getAmount());
        order.setStatus("PENDING");
        order.setRazorpayOrderId(razorpayOrder.get("id"));
        order = orderRepository.save(order);
        
        // Save order items
        for (CreateOrderRequest.OrderItemDto itemDto : request.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(order.getId());
            orderItem.setProductId(itemDto.getProductId());
            orderItem.setProductName(itemDto.getProductName());
            orderItem.setPrice(itemDto.getPrice());
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setSubtotal(itemDto.getPrice().multiply(new BigDecimal(itemDto.getQuantity())));
            orderItemRepository.save(orderItem);
        }
        
        OrderResponse response = new OrderResponse();
        response.setOrderId(razorpayOrder.get("id"));
        response.setAmount(request.getAmount());
        response.setCurrency("INR");
        response.setKeyId(razorpayKeyId);
        
        return response;
    }
    
    public boolean verifyPayment(PaymentVerificationRequest request) {
        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            
            // Verify payment signature
            JSONObject attributes = new JSONObject();
            attributes.put("razorpay_order_id", request.getRazorpayOrderId());
            attributes.put("razorpay_payment_id", request.getRazorpayPaymentId());
            attributes.put("razorpay_signature", request.getRazorpaySignature());
            
            boolean isValid = com.razorpay.Utils.verifyPaymentSignature(attributes, razorpayKeySecret);
            
            if (isValid) {
                // Update order status
                com.clothing.ecommerce.model.Order order = orderRepository
                    .findByRazorpayOrderId(request.getRazorpayOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found"));
                
                order.setStatus("PAID");
                order.setRazorpayPaymentId(request.getRazorpayPaymentId());
                order.setRazorpaySignature(request.getRazorpaySignature());
                orderRepository.save(order);
            }
            
            return isValid;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public static class OrderResponse {
        private String orderId;
        private BigDecimal amount;
        private String currency;
        private String keyId;
        
        public String getOrderId() {
            return orderId;
        }
        
        public void setOrderId(String orderId) {
            this.orderId = orderId;
        }
        
        public BigDecimal getAmount() {
            return amount;
        }
        
        public void setAmount(BigDecimal amount) {
            this.amount = amount;
        }
        
        public String getCurrency() {
            return currency;
        }
        
        public void setCurrency(String currency) {
            this.currency = currency;
        }
        
        public String getKeyId() {
            return keyId;
        }
        
        public void setKeyId(String keyId) {
            this.keyId = keyId;
        }
    }
}

