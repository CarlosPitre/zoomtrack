<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuarios_model extends CI_Model {

	public function login($datos = array())
	{
		$query = $this->db->select('id, name, username, email, profile_id')
						->from('users')
						->where($datos)
						->get();
		$usuario = $query->row();
		return $usuario;
	}

}

/* End of file Administracion_model.php */
/* Location: ./application/models/Administracion_model.php */