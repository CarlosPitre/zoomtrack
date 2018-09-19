<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . 'libraries/REST_Controller.php';

class NewsCtrl extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('News_model');
	}

	public function news_post()
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->save_new();
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

	public function save_new()
	{
		$title = $this->post('title');
		$body = $this->post('body');
		$users_id = $this->post('users_id');
		$tags = $this->post('tags');
		if (is_null($title) || is_null($body) || is_null($users_id)) {
			$respuesta['status'] = false;
			$respuesta['mensaje'] = "Datos incompletos. Por favor verifica la información";
		}else{
			$datos = array(
				'title' => $title,
				'body' => $body,
				'users_id' => $users_id,
			);
			$response = $this->News_model->save_news($datos);
			if ($response['status'] == true) {

				for ($i=0; $i < count($tags); $i++) { 
					$tags[$i]["news_id"] = $response['id'];
				}
				$this->db->insert_batch('tags_news', $tags);
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
	
	public function news_put()
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->update_new();
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

	public function update_new()
	{
		$id = $this->put('id');
		$title = $this->put('title');
		$body = $this->put('body');
		if (is_null($title) || is_null($body)) {
			$respuesta['status'] = false;
			$respuesta['mensaje'] = "Datos incompletos. Por favor verifica la información";
		}else{
			$datos = array(
				'title' => $title,
				'body' => $body,
			);
			$response = $this->News_model->update_news($datos, $id);

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

	public function news_delete($id)
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->delete_new($id);
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

	public function delete_new($id)
	{
		$response = $this->News_model->delete_news($id);
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

	public function news_get($init, $final)
	{
		$headers = $this->input->request_headers();
		if (Authorization::tokenIsExist($headers)) {
            $token = Authorization::validateToken($headers['Token']);
            if ($token != false) {
                $respuesta = $this->list_news($init, $final);
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

	public function list_news($init, $final)
	{
		$response = $this->News_model->list_news($init, $final);
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

/* End of file NewsCtrl.php */
/* Location: ./application/controllers/NewsCtrl.php */