<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users_model extends CI_Model {

	public function login($datos = array())
	{
		$query = $this->db->select('id, name, username, email, profile_id')
						->from('users')
						->where($datos)
						->get();
		$usuario = $query->row();
		return $usuario;
	}

	public function save_users($datos = array())
	{
		$this->db->insert('users', $datos);
		$error = $this->db->error();
		if ($error['code'] == 0) {
			$response['status'] = true;
			$response['id'] = $this->db->insert_id();
		}else{
			$response['status'] = false;
			$response['mensaje'] = $error['message'];
		}
		return $response;
	}

	public function update_users($datos = array(), $id)
	{
		$this->db->where('id', $id);
		$this->db->update('users', $datos);
		$error = $this->db->error();

		if ($error['code'] == 0) {
			$response['status'] = true;
		}else{
			$response['status'] = false;
			$response['mensaje'] = $error['message'];
		}
		return $response;
	}

	public function delete_users($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('users');
		$error = $this->db->error();
		
		if ($error['code'] == 0) {
			$response['status'] = true;
		}else{
			$response['status'] = false;
			$response['mensaje'] = $error['message'];
		}
		return $response;
	}

	public function list_users($init, $final)
	{	
		$query = $this->db->select('id, name, username, email, profile_id')
							->from('users')
							->where('state', true)
							->limit( $final, $init)
							->get();

		$error = $this->db->error();
		if ($error['code'] == 0) {
			$response['status'] = true;
			$response['datos'] = $query->result();
		}else{
			$response['status'] = false;
			$response['mensaje'] = $error['message'];
		}
		return $response;
	}



}

/* End of file Administracion_model.php */
/* Location: ./application/models/Administracion_model.php */