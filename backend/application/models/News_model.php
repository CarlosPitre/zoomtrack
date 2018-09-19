<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class News_model extends CI_Model {

	public function save_news($datos = array())
	{
		$this->db->insert('news', $datos);
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

	public function update_news($datos = array(), $id)
	{
		$this->db->where('id', $id);
		$this->db->update('news', $datos);
		$error = $this->db->error();

		if ($error['code'] == 0) {
			$response['status'] = true;
		}else{
			$response['status'] = false;
			$response['mensaje'] = $error['message'];
		}
		return $response;
	}

	public function delete_news($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('news');
		$error = $this->db->error();
		
		if ($error['code'] == 0) {
			$response['status'] = true;
		}else{
			$response['status'] = false;
			$response['mensaje'] = $error['message'];
		}
		return $response;
	}

	public function list_news($init, $final)
	{	
		$query = $this->db->select('n.id, n.title, n.body, users.name')
							->from('news n')
							->join('users u', 'u.id = n.users_id', 'inner')
							->limit($final, $init)
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

/* End of file News_model.php */
/* Location: ./application/models/News_model.php */