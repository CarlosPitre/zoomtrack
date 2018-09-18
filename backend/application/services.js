var uri = "http://centraldeherramientas.com:1500/api";
var uriRelacional = "http://centraldeherramientas.com/apiRelacional/app";
//var uriRelacional = "http://localhost/centraldeherramientas/apiRelacional/app"
var uriTotal = "http://186.145.214.176/api";

/*var uri = "http://localhost:1500/api";
var uriRelacional = "http://localhost/centraldeherramientas/apiRelacional/app";
var uriTotal = "http://localhost:1082/api";*/

materialAdmin

	.factory("Datos", function() {
			return {
				data: {}
			};
		})

	// ****************************************
	// **				USUARIOS 			 **
	// ****************************************

	.service('usuarioService', function($http){
		this.get = function  () {
			var req = $http.get(uriRelacional + '/usuarios');
			return req;
		}
		this.getModulos = function  () {
			var req = $http.get(uriRelacional + '/modulos');
			return req;
		}
		this.post = function  (object) {
			var req = $http.post(uriRelacional + '/usuarios', object);
			return req;
		}
		this.put = function  (object) {
			var req = $http.put(uriRelacional + '/usuarios', object);
			return req;
		}
		this.login = function  (object) {
			var req = $http.post(uriRelacional + '/login', object);
			return req;
		}
	})

	// ****************************************
	// **				MANTENIMIENTOS 							 **
	// ****************************************

	.service('mantenimientoService', function($http){
		this.getCentros = function  (object) {
			var req = $http.get(uriTotal + '/centroscostos/actividad/' + object.act + '/proyecto/' + object.proy + '/servicio/' + object.serv + '/estado/' + object.estadoCC + '/ano/' + object.ano);
			return req;
		}
		this.getProductos = function  (object) {
			var req = $http.post(uriTotal + '/bodegas/ano/' + object.ano + '/productos/descripcion', object);
			return req;
		}
		this.getHerramientas = function (object) {
			var req = $http.post(uriRelacional + '/basicos/herramientas/descripcion', object);
			return req;
		}
		this.getTecnicos = function (object) {
			var req = $http.post(uriRelacional + '/basicos/tecnicos/descripcion', object);
			return req;
		}
		this.getOtByEstado = function (estado) {
			var req = $http.get(uriRelacional + '/ot/estado/' + estado);
			return req;
		}
		this.getOtById = function (id) {
			var req = $http.get(uriRelacional + '/ot/' + id);
			return req;
		}
		this.tiposMantenimiento = function () {
			var req = $http.get(uriRelacional + '/basicos/mantenimientos/fallas');
			return req;
		}
		this.getSistemasByCcosto = function (ccosto) {
			var req = $http.get(uriRelacional + '/ccosto/' + ccosto + '/sistemas');
			return req;
		}
		this.getComponentesBySistemas = function (idSistema) {
			var req = $http.get(uriRelacional + '/sistema/' + idSistema + '/componentes');
			return req;
		}
		this.getSubomponentesByComponentes = function (idComponente) {
			var req = $http.get(uriRelacional + '/componente/' + idComponente + '/subcomponentes');
			return req;
		}
		this.postOt = function (object) {
			var req = $http.post(uriRelacional + '/ot', object);
			return req;
		}
		this.ejecutarOt = function (object) {
			var req = $http.post(uriRelacional + '/ot/ejecutar', object);
			return req;
		}
		this.saveTecnicos = function (object) {
			var req = $http.post(uriRelacional + '/ot/tecnicos', object);
			return req;
		}
	})

	// ****************************************
	// **				DISEÑOS								 			 **
	// ****************************************

	.service('disenoService', function($http){

		this.postSistema = function (object) {
			var req = $http.post(uriRelacional + '/sistemas', object);
			return req;
		}

	})

	// ****************************************
	// **				FACTURAS 			 **
	// ****************************************

	.service('facturaService', function($http){
		this.getCompras = function  (busqueda) {
			var req = $http.get(uriRelacional + '/facturas/' + busqueda.numero + '/mes/'+ busqueda.mes + '/ano/' + busqueda.ano);
			return req;
		}
		this.getAjustes = function  (busqueda) {
			var req = $http.get(uriRelacional + '/ajustes/' + busqueda.numero + '/mes/'+ busqueda.mes + '/ano/' + busqueda.ano);
			return req;
		}
		this.comprarPrecio = function  (codigo, precio) {
			var req = $http.get(uri + '/producto/' + codigo + '/precio/' + precio);
			return req;
		}
		this.postFactura = function  (object) {
			var req = $http.post(uriRelacional + '/productos/factor', object);
			return req;
		}
		this.getFactura = function  (factura) {

			var req = $http.get(uriRelacional + '/productos/factor/'+ factura);
			return req;
		}

		this.getProducto = function  (id, tipo) {
			var req = $http.get(uriRelacional + '/productos/tipo/'+ tipo + '/'+ id );
			return req;
		}

		this.getProductoByDescripcion = function  (producto) {

			var req = $http.get(uri + '/producto/codigo/'+producto);
			return req;
		}
	})

	// ****************************************
	// **				PRODUCTOS 			 **
	// ****************************************

	.service('productoService', function($http){
		this.getFaltantes = function  (busqueda) {
			var req = $http.post(uriTotal + '/bodegas/' + busqueda.bodega + '/mes/'+ busqueda.mes + '/ano/' + busqueda.ano + '/productos/faltantes', busqueda);
			return req;
		}
		this.getListado = function  (busqueda) {
			var req = $http.get(uriTotal + '/bodegas/' + busqueda.bodega + '/mes/'+ busqueda.mes + '/ano/' + busqueda.ano + '/productos/');
			return req;
		}
		this.getCodificacion = function  () {
			var req = $http.get(uriTotal + '/bodegas/codificacion');
			return req;
		}
		this.getInventario = function  () {
			var req = $http.get(uri + '/producto');
			return req;
		}
	})

	// ****************************************
	// **			  GARANTIAS		 		 **
	// ****************************************

	.service('garantiaService', function($http){

		this.get = function  () {
			var req = $http.get(uri + '/garantias');
			return req;
		}
		this.post = function  (object) {
			var req = $http.post(uri + '/garantias', object);
			return req;
		}
	})

	// ****************************************
	// **			  REPORTES		 		 **
	// ****************************************

	.service('reporteService', function($http){

		this.getComprasByFecha = function  (object) {
			var req = $http.post(uriTotal + '/reportes/compras', object);
			return req;
		}
		this.getVentasByFecha = function  (object) {
			var req = $http.post(uriTotal + '/reportes/ventas', object);
			return req;
		}
		this.getMovimientosByFecha = function  (object, tipo) {
			var req = $http.post(uriTotal + '/reportes/inventario/' + tipo, object);
			return req;
		}

	})

	// ****************************************
	// **			COTIZACIONES 			 **
	// ****************************************

	.service('cotizacionService', function($http){

		this.getProveedores = function  (object) {
			var req = $http.post(uriTotal + '/compras/productos/proveedores', object);
			return req;
		}

		this.putCotizar = function  (object) {
			var req = $http.put(uriRelacional + '/pedidos/productos/cotizar', object);
			return req;
		}

		this.postPedidos = function  (object) {
			var req = $http.post(uriRelacional + '/pedidos', object);
			return req;
		}

		this.getPedidos = function  () {
			var req = $http.get(uri + '/pedido');
			return req;
		}

		this.getMisPedidos = function  (id) {
			var req = $http.get(uriRelacional + '/usuario/'+ id + '/pedidos');
			return req;
		}

		this.getPedidosBySede = function  (id, estado) {
			var req = $http.get(uriRelacional + '/sede/' + id + '/pedidos/' + estado + '/productos');
			return req;
		}

		this.getBodegas = function  () {
			var req = $http.get(uriRelacional + '/basicos/bodegas');
			return req;
		}

		this.getSalidas = function  () {
			var req = $http.get(uriRelacional + '/basicos/salidas');
			return req;
		}

		this.getCcostos = function  () {
			var req = $http.get(uriRelacional + '/basicos/ccostos');
			return req;
		}

		this.updateEstadoProducto = function (id, object) {
			var req = $http.put(uriRelacional + '/pedidos/producto/' + id + '/estado', object);
			return req;
		}

		this.getProductosCotizados = function  (){
			var req = $http.get(uriRelacional + '/pedidos/productos/cotizados');
			return req;
		}

		this.postProveedor = function  (object) {
			var req = $http.post(uriRelacional + '/proveedores', object);
			return req;
		}

		this.postCompras = function  (object) {
			var req = $http.post(uriRelacional + '/pedidos/productos/compra', object);
			return req;
		}

		this.postSalidas = function  (object) {
			var req = $http.post(uriRelacional + '/pedidos/productos/salida', object);
			return req;
		}

		this.postTraslado = function  (object) {
			var req = $http.post(uriRelacional + '/pedidos/productos/traslado', object);
			return req;
		}

		this.putCompra = function  (object) {
			var req = $http.put(uriRelacional + '/pedidos/productos/compra', object);
			return req;
		}

		this.getCompras= function  () {
			var req = $http.get(uriRelacional + '/pedidos/productos/compra');
			return req;
		}

		this.postHistorico = function  (object) {
			var req = $http.post(uriTotal + '/compras/historico', object);
			return req;
		}


	})

	// ****************************************
	// **				UTILES	 			 **
	// ****************************************
