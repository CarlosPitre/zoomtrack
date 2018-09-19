<?php
defined('BASEPATH') OR exit('No direct script access allowed');


require_once APPPATH . 'libraries/REST_Controller.php';

class TagsCtrl extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Tags_model');
	}

	public function tags_post()
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->save_tag();
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

	public function save_tag()
	{
		$name = $this->post('name');
		if (is_null($name)) {
			$respuesta['status'] = false;
			$respuesta['mensaje'] = "Datos incompletos. Por favor verifica la información";
		}else{
			$datos = array(
				'name' => $name,
			);
			$response = $this->Tags_model->save_tags($datos);
			if ($response['status'] == true) {
				$respuesta['status'] = true;
				$respuesta['id'] = $response['id'];
				$respuesta['mensaje'] = "Datos Guardados Correctamente";
			}else{
				$respuesta['status'] = false;
				$respuesta['mensaje'] =  $response['mensaje'];
			}
		}
		return $respuesta;
	}
	
	public function tags_put()
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->update_tag();
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

	public function update_tag()
	{
		$id = $this->put('id');
		$name = $this->put('name');
		if (is_null($name)) {
			$respuesta['status'] = false;
			$respuesta['mensaje'] = "Datos incompletos. Por favor verifica la información";
		}else{
			$datos = array(
				'name' => $name
			);
			$response = $this->Tags_model->update_tags($datos, $id);

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

	public function tags_delete($id)
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->delete_tag($id);
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

	public function delete_tag($id)
	{
		$response = $this->Tags_model->delete_tags($id);
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

	public function tags_get($init, $final)
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->list_tags($init, $final);
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

	public function list_tags($init, $final)
	{
		$response = $this->Tags_model->list_tags($init, $final);
		if ($response['status'] == true) {
			$respuesta['status'] = true;
			$respuesta['datos'] = $response['datos'];
		}else{
			$respuesta['status'] = false;
			$respuesta['mensaje'] =  $response['mensaje'];
		}
		return $respuesta;
	}

}

/* End of file TagsCtrl.php */
/* Location: ./application/controllers/TagsCtrl.php */