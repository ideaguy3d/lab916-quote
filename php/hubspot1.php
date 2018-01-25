<?php
/**
 * Created by PhpStorm.
 * User: lab916
 * Date: 12/12/2017
 * Time: 2:03 PM
 */

// header ('Content-type: application/json');
// echo ")]}'\n";
// echo 'it worked!! email = '.$_GET['email'].' | name = '.$_GET['name'].' | number = '.$_GET['number'].' | message/lastname = '.$_GET['message'];


$arr = array(
    'properties' => array(
        array(
            'property' => 'email',
            'value' => $_GET['email']
        ),
        array(
            'property' => 'firstname',
            'value' => $_GET['name']
        ),
        array(
            'property' => 'lastname',
            'value' => $_GET['message']
        ),
        array(
            'property' => 'phone',
            'value' => $_GET['number']
        )
    )
);

$post_json = json_encode($arr);

// $hapikey = readline("Enter hapikey: (demo for the demo portal): ");
// sales/2776720/contacts
$endpoint = 'https://api.hubapi.com/contacts/v1/contact?hapikey=' . '5a880d43-3d88-4ec8-a46d-8e9ef05000f1';
$ch = @curl_init();
@curl_setopt($ch, CURLOPT_POST, true);
@curl_setopt($ch, CURLOPT_POSTFIELDS, $post_json);
@curl_setopt($ch, CURLOPT_URL, $endpoint);
@curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
@curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = @curl_exec($ch);
$status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_errors = curl_error($ch);
@curl_close($ch);
echo "curl Errors: " . $curl_errors;
echo "\nStatus code: " . $status_code;
echo "\nResponse: " . $response;



