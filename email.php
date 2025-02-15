<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Lade Composer-Abhängigkeiten
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

//Prüfe ob .env geladen wurde
if (!isset($_ENV['SMTP_HOST'])) {
    die("Fehler: .env-Datei nicht geladen.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $betreff = htmlspecialchars($_POST['betreff']);
    $message = nl2br(htmlspecialchars($_POST['message']));
    $telefonnummer = isset($_POST['telefonnummer']) && !empty($_POST['telefonnummer']) 
        ? htmlspecialchars($_POST['telefonnummer']) 
        : "Keine Telefonnummer angegeben";

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Ungültige E-Mail-Adresse.");
    }

    function loadEmailTemplate($templatePath, $data) {
        $template = file_get_contents($templatePath);
        foreach ($data as $key => $value) {
            $template = str_replace('{{'.$key.'}}', $value, $template);
        }
        return $template;
    }

    $mail = new PHPMailer(true);

    try {
        // **SMTP-Server-Einstellungen**
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->Username = $_ENV['SMTP_USER'];
        $mail->Password = $_ENV['SMTP_PASS'];
        $mail->Port = $_ENV['SMTP_PORT'];
        $mail->SMTPAuth = filter_var($_ENV['SMTP_AUTH'], FILTER_VALIDATE_BOOLEAN);
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->CharSet = 'UTF-8';
        $mail->isHTML(true);

        // **Erste E-Mail: Anfrage an Admin**
        $adminEmailData = [
            'name' => $name,
            'email' => $email,
            'telefonnummer' => $telefonnummer,
            'betreff' => $betreff,
            'message' => $message
        ];

        $adminEmailContent = loadEmailTemplate('mailAnfrageTemplate.html', $adminEmailData);

        $mail->setFrom('franziska.silberhorn@web.de', 'Website-Kontaktformular');
        $mail->addAddress('franziska.silberhorn@web.de'); // Empfänger (du selbst)
        $mail->addReplyTo($email, $name);
        $mail->Subject = "Betreff: " . $betreff;
        $mail->Body = $adminEmailContent;

        // Falls der E-Mail-Client kein HTML unterstützt:
        $mail->AltBody = "Neue Nachricht von $name\n\n" .
        "Telefonnummer: $telefonnummer\n" .
        "E-Mail: $email\n\n" .
        "Betreff: $betreff\n" .
        "Nachricht:\n$message";

        $mail->send(); // **Erste E-Mail senden**

        // **Zweite E-Mail: Bestätigung an den Nutzer**
        $mail->clearAddresses();
        $mail->clearAttachments();

        $userEmailData = [
            'name' => $name,
            'betreff' => $betreff,
            'message' => $message
        ];
        $userEmailContent = loadEmailTemplate('mailBestaetigungTemplate.html', $userEmailData);

        $mail->addAddress($email); // **Empfänger: Nutzer**
        $mail->Subject = "Bestätigung deiner Anfrage";
        $mail->Body = $userEmailContent;

        $mail->AltBody = "Hallo $name,\n\n" .
                         "Vielen Dank für deine Nachricht! Wir haben deine Anfrage erhalten.\n\n" .
                         "Hier eine Kopie deiner Nachricht:\n\n" .
                         "Betreff: $betreff\n" .
                         "Nachricht:\n$message\n\n" .
                         "Viele Grüße,\nDein Team";

        $mail->send(); // **Zweite E-Mail senden**
        
        //echo 'E-Mail erfolgreich gesendet und Bestätigung verschickt!';
        header("Location: erfolg.html");
        exit();
    } catch (Exception $e) {
        //echo "Fehler beim Senden der E-Mail: {$mail->ErrorInfo}";
        header("Location: fehler.html");
        exit();
    }
} else {
    echo "Ungültige Anfrage.";
}
?>