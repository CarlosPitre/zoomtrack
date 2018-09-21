<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tags_model extends CI_Model {
	

	public function save_tags($datos = array())
	{
		$this->db->insert('tags', $datos);
		$error = $this->db->error();
		if ($error['code'] == 0) {
			$response['status'] = true;
			$response['id'] = $this->db->insert_id();
		}else{
			$response['status'] = false;
			$response['message'] = $error['message'];
		}
		return $response;
	}

	public function update_tags($datos = array(), $id)
	{
		$this->db->where('id', $id);
		$this->db->update('tags', $datos);
		$error = $this->db->error();

		if ($error['code'] == 0) {
			$response['status'] = true;
		}else{
			$response['status'] = false;
			$response['message'] = $error['message'];
		}
		return $response;
	}

	public function delete_tags($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('tags');
		$error = $this->db->error();
		
		if ($error['code'] == 0) {
			$response['status'] = true;
		}else{
			$response['status'] = false;
			$response['message'] = $error['message'];
		}
		return $response;
	}

	public function list_tags($init, $final)
	{	
		$query = $this->db->select('id, name')
							->from('tags')
							->limit( $final, $init)
							->get();

		$error = $this->db->error();
		if ($error['code'] == 0) {
			$response['status'] = true;
			$response['datos'] = $query->result();
		}else{
			$response['status'] = false;
			$response['message'] = $error['message'];
		}
		return $response;
	}

	public function total()
	{
		$query = $this->db->select('COUNT(*) as total')
							->from('tags')
							->get();
		return $query->row()->total;
	}

}

/* End of file Tags_model.php */
/* Location: ./application/models/Tags_model.php */