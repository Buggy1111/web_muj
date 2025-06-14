<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name    = $_POST['name']    ?? '';
    $email   = $_POST['email']   ?? '';
    $phone   = $_POST['phone']   ?? '';
    $message = $_POST['message'] ?? '';

    if (!$name || !$email || !$message) {
        http_response_code(400);
        echo 'Chybí povinná pole.';
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // === SMTP nastavení – vyplň své údaje ===
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'michalbugy12@gmail.com';
        $mail->Password   = 'TVUJ_APP_HESLO';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        // ========================================

        // Odesílatel a příjemce
        $mail->setFrom('michalbugy12@gmail.com', 'Michal');
        $mail->addAddress('michalbugy12@gmail.com', 'Michal');

        $mail->addReplyTo($email, $name);
// Obsah
        $mail->Subject = 'Zpráva z kontaktního formuláře';
        $body  = "Jméno: {$name}\n";
        $body .= "E‑mail: {$email}\n";
        if ($phone) {
            $body .= "Telefon: {$phone}\n";
        }
        $body .= "\nZpráva:\n{$message}";
        $mail->Body = $body;

        $mail->send();
        echo 'OK';
    } catch (Exception $e) {
        http_response_code(500);
        echo 'Chyba při odeslání: ' . $mail->ErrorInfo;
    }
} else {
    http_response_code(405);
}
?>
