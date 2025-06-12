<?php
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize the email input to prevent injection
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    // Validate the email format
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

        $file_path = 'newsletter_subscribers.txt'; // Name of the file to save emails

        // Open the file in append mode ('a')
        // Creates the file if it doesn't exist
        $file = fopen($file_path, 'a');

        if ($file) {
            // Write the email and a newline character
            fwrite($file, $email . "\n");
            // Close the file
            fclose($file);

            // Redirect back to the homepage or a thank you page
            // You can add a success message to the URL if needed
            header("Location: index.html?status=success");
            exit();
        } else {
            // Error opening file
            header("Location: index.html?status=error&message=file_write_failed");
            exit();
        }
    } else {
        // Invalid email format
        header("Location: index.html?status=error&message=invalid_email");
        exit();
    }
} else {
    // Not a POST request, redirect to homepage
    header("Location: index.html");
    exit();
}
?>