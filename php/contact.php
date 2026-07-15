<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);
    $service_type = htmlspecialchars($_POST['service_type']);
    
    try {
        $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, phone, service_type, message, created_at) 
                               VALUES (:name, :email, :phone, :service_type, :message, NOW())");
        
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':service_type' => $service_type,
            ':message' => $message
        ]);
        
        // Trimite email de notificare
        $to = 'contact@technestpc.ro';
        $subject = 'Nouă cerere de contact - TechNest PC';
        $email_message = "Nume: $name\nEmail: $email\nTelefon: $phone\nServiciu: $service_type\nMesaj: $message";
        mail($to, $subject, $email_message);
        
        header('Location: ../contact.html?success=1');
        exit;
    } catch(PDOException $e) {
        header('Location: ../contact.html?error=1');
        exit;
    }
}
?>