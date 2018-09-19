<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . 'libraries/REST_Controller.php';

class UsersCtrl extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Users_model');
	}

	/*
		registro de usuarios
	*/

	public function users_post()
	{
		$name = $this->post('name');
		$username = $this->post('username');
		$email = $this->post('email');
		$password = $this->post('password');
		if (is_null($name) || is_null($username) || is_null($email) || is_null($password)) {
			$respuesta['status'] = false;
			$respuesta['mensaje'] = "Datos incompletos. Por favor verifica la información";
		}else{
			$datos = array(
				'name' => $name, 
				'username' => $username,
				'email' => $email,
				'password' => sha1($password),
				'state' => true,
				'profile_id' => '2'
			);
			$response = $this->Users_model->save_users($datos);
			if ($response['status'] == true) {
				$respuesta['status'] = true;
				$respuesta['id'] = $response['id'];
				$respuesta['mensaje'] = "Datos Guardados Correctamente";
			}else{
				$respuesta['status'] = false;
				$respuesta['mensaje'] =  $response['mensaje'];
			}
		}
		$code = REST_Controller::HTTP_OK;
		$this->set_response($respuesta, $code);
	}

	/*
		edición de usuarios
	*/

	public function users_put()
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->update_user();
                $code = REST_Controller::HTTP_OK;
            }else{
            	$respuesta["mensaje"] = "invalid";
            	$code = REST_Controller::HTTP_FORBIDDEN;
            }
        }else{
        	$respuesta["mensaje"] = "No Tienes Acceso este servicio.";
        	$code = REST_Controller::HTTP_FORBIDDEN;
        }
        $this->set_response($respuesta, $code);
	}

	public function update_user()
	{
		$id = $this->put('id');
		$name = $this->put('name');
		$username = $this->put('username');
		$email = $this->put('email');
		$password = $this->put('password');
		if (is_null($name) || is_null($username) || is_null($email) || is_null($password)) {
			$respuesta['status'] = false;
			$respuesta['mensaje'] = "Datos incompletos. Por favor verifica la información";
		}else{
			$datos = array(
				'name' => $name, 
				'username' => $username,
				'username' => $username,
				'email' => $email,
				'password' => sha1($password),
			);
			$response = $this->Users_model->update_users($datos, $id);

			if ($response['status'] == true) {
				$respuesta['status'] = true;
				$respuesta['mensaje'] = "Datos Guardados Correctamente";
			}else{
				$respuesta['status'] = false;
				$respuesta['mensaje'] =  $response['mensaje'];
			}
		}
		return $respuesta;
	}

	/*
		eliminación de usuarios
	*/

	public function users_delete($id)
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->delete_user($id);
                $code = REST_Controller::HTTP_OK;
            }else{
            	$respuesta["mensaje"] = "invalid";
            	$code = REST_Controller::HTTP_FORBIDDEN;
            }
        }else{
        	$respuesta["mensaje"] = "No Tienes Acceso este servicio.";
        	$code = REST_Controller::HTTP_FORBIDDEN;
        }
        $this->set_response($respuesta, $code);
	}

	public function delete_user($id)
	{
		$response = $this->Users_model->delete_users($id);
		if ($response['status'] == true) {
			$respuesta['status'] = true;
			$respuesta['mensaje'] = "Datos Eliminados Correctamente";
		}else{
			$respuesta['status'] = false;
			$respuesta['mensaje'] =  $response['mensaje'];
		}
		return $respuesta;
	}

	/*
		Listado de usuarios
	*/

	public function users_get($init, $final)
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->list_users($init, $final);
                $code = REST_Controller::HTTP_OK;
            }else{
            	$respuesta["mensaje"] = "invalid";
            	$code = REST_Controller::HTTP_FORBIDDEN;
            }
        }else{
        	$respuesta["mensaje"] = "No Tienes Acceso este servicio.";
        	$code = REST_Controller::HTTP_FORBIDDEN;
        }
        $this->set_response($respuesta, $code);
	}

	public function list_users($init, $final)
	{
		$response = $this->Users_model->list_users($init, $final);
		if ($response['status'] == true) {
			$respuesta['status'] = true;
			$respuesta['datos'] = $response['datos'];
		}else{
			$respuesta['status'] = false;
			$respuesta['mensaje'] =  $response['mensaje'];
		}
		return $respuesta;
	}

	/*
		Edición estado usuarios
	*/
	public function changeState_put()
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->changeState_user();
                $code = REST_Controller::HTTP_OK;
            }else{
            	$respuesta["mensaje"] = "invalid";
            	$code = REST_Controller::HTTP_FORBIDDEN;
            }
        }else{
        	$respuesta["mensaje"] = "No Tienes Acceso este servicio.";
        	$code = REST_Controller::HTTP_FORBIDDEN;
        }
        $this->set_response($respuesta, $code);
	}

	public function changeState_user()
	{
		$id = $this->put('id');
		$state = $this->put('state');
		$datos = array(
			'state' => $state, 
		);
		$response = $this->Users_model->update_users($datos, $id);

		if ($response['status'] == true) {
			$respuesta['status'] = true;
			$respuesta['mensaje'] = "Datos Guardados Correctamente";
		}else{
			$respuesta['status'] = false;
			$respuesta['mensaje'] =  $response['mensaje'];
		};
		return $respuesta;
	}

}

/* End of file UsersCtrl.php */
/* Location: ./application/controllers/UsersCtrl.php */