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
            	$respuesta["message"] = "invalid";
            	$code = REST_Controller::HTTP_FORBIDDEN;
            }
        }else{
        	$respuesta["message"] = "No Tienes Acceso este servicio.";
        	$code = REST_Controller::HTTP_FORBIDDEN;
        }
        $this->set_response($respuesta, $code);
	}

	public function save_tag()
	{
		$name = $this->post('name');
		if (is_null($name)) {
			$respuesta['status'] = false;
			$respuesta['message'] = "Datos incompletos. Por favor verifica la información";
		}else{
			$datos = array(
				'name' => $name,
			);
			$response = $this->Tags_model->save_tags($datos);
			if ($response['status'] == true) {
				$respuesta['status'] = true;
				$respuesta['id'] = $response['id'];
				$respuesta['message'] = "Datos Guardados Correctamente";
			}else{
				$respuesta['status'] = false;
				$respuesta['message'] =  $response['message'];
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
            	$respuesta["message"] = "invalid";
            	$code = REST_Controller::HTTP_FORBIDDEN;
            }
        }else{
        	$respuesta["message"] = "No Tienes Acceso este servicio.";
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
			$respuesta['message'] = "Datos incompletos. Por favor verifica la información";
		}else{
			$datos = array(
				'name' => $name
			);
			$response = $this->Tags_model->update_tags($datos, $id);

			if ($response['status'] == true) {
				$respuesta['status'] = true;
				$respuesta['message'] = "Datos Guardados Correctamente";
			}else{
				$respuesta['status'] = false;
				$respuesta['message'] =  $response['message'];
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
            	$respuesta["message"] = "invalid";
            	$code = REST_Controller::HTTP_FORBIDDEN;
            }
        }else{
        	$respuesta["message"] = "No Tienes Acceso este servicio.";
        	$code = REST_Controller::HTTP_FORBIDDEN;
        }
        $this->set_response($respuesta, $code);
	}

	public function delete_tag($id)
	{
		$response = $this->Tags_model->delete_tags($id);
		if ($response['status'] == true) {
			$respuesta['status'] = true;
			$respuesta['message'] = "Datos Eliminados Correctamente";
		}else{
			$respuesta['status'] = false;
			$respuesta['message'] =  $response['message'];
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
            	$respuesta["message"] = "invalid";
            	$code = REST_Controller::HTTP_FORBIDDEN;
            }
        }else{
        	$respuesta["message"] = "No Tienes Acceso este servicio.";
        	$code = REST_Controller::HTTP_FORBIDDEN;
        }
        $this->set_response($respuesta, $code);
	}

	public function list_tags($init, $final)
	{
		$response = $this->Tags_model->list_tags($init, $final);
		if ($response['status'] == true) {
			$totalPages = ceil((($this->Tags_model->total())/$final));
			$inicial = 0;
			$pages = [];
			for ($i=0; $i < $totalPages; $i++) { 
				$pages[] = array(
					'page' => strval($i + 1),
					'init' => strval($inicial)
				);
				$inicial = $inicial + $final;
			}

			$respuesta['status'] = true;
			$respuesta['count'] = $this->Tags_model->total();
			$respuesta['pages'] = $pages;
			$respuesta['tags'] = $response['datos'];
		}else{
			$respuesta['status'] = false;
			$respuesta['message'] =  $response['message'];
		}
		return $respuesta;
	}

}

/* End of file TagsCtrl.php */
/* Location: ./application/controllers/TagsCtrl.php */