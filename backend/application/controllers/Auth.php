<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . 'libraries/REST_Controller.php';

class Auth extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Users_model');
	}

	public function login_post()
	{
		$username = $this->post('username');
		$password = $this->post('password');
		$datos = array(
			'username' => $username,
			'password' => sha1($password),
			'state' => true
 		);
 		$user = $this->Users_model->login($datos);
 		if ($user) {
 			$tokenData = array();
 			$tokenData['id'] = $user->id;
 			$respuesta['token'] = Authorization::generateToken($tokenData);
 			$respuesta["user"] = $user;
 			$code = REST_Controller::HTTP_OK;
 		}else{
 			$respuesta["mensaje"] = "Datos incorrectos.Por favor verfica lo campos.";
 			$code = REST_Controller::HTTP_OK;
 		}
 		$this->set_response($respuesta, $code);
	}

}

/* End of file Auth.php */
/* Location: ./application/controllers/Auth.php */