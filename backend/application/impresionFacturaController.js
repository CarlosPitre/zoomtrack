materialAdmin.controller('impresionFacturaController', function($scope, utilService, facturaService){

	$scope.Meses = utilService.meses()
	$scope.Anos = utilService.años();
	$scope.Tipos = utilService.tiposImpresion();
	$scope.Busqueda = {}
	$scope.Factura = {};
	$scope.arrayImpresion = []
	$scope.disableImprimir = true;
	var id = 0;

	$scope.buscar = function  () {

		switch($scope.Busqueda.tipo) {
			case "Factura":
				getFactura()
				break;
			case "Producto":
				getProducto()
				break;
		}

	}

	function getFactura () {
		var promiseGet = facturaService.getFactura($scope.Busqueda.numero);
		promiseGet.then(function(pl) {
				if (pl.status) {
					console.log(JSON.stringify(pl.data.productos))
					 $scope.Productos = pl.data.productos;
				}else{
					swal(pl.data.mensaje, "Error en el procedimiento", "error")
				}

		},
		function(errorPl) {
		    console.log('Error Al Cargar Datos', errorPl);
		});
	}

	function getProducto () {
		var promiseGet = facturaService.getProducto($scope.Busqueda.numero, $scope.Busqueda.tipoProducto);
		promiseGet.then(function(pl) {
		    $scope.Productos = pl.data.productos;
		},
		function(errorPl) {
		    console.log('Error Al Cargar Datos', errorPl);
		});
	}

	$scope.agregar = function  (producto) {
		
		producto.impreso = true;
		for (var j = 0; j < producto.cantImprimir; j++) {
			id = id + 1;
			console.log(producto.producto)
			$scope.arrayImpresion.push(
				{
					id : id,
					codigo : producto.codigo,
					producto : producto.producto,
					precio : producto.precio,
					factor : producto.factor
				}
			)
		};
		console.log(JSON.stringify($scope.arrayImpresion))
		if ($scope.arrayImpresion.length > 0) {
			$scope.disableImprimir = false;
		}else{
			$scope.disableImprimir = true;
		}
	}

	$scope.eliminar = function  (producto) {
		producto.impreso = false;
		var aux = []
		for (var i = 0; i < $scope.arrayImpresion.length; i++) {
			if ($scope.arrayImpresion[i].codigo != producto.codigo) {
				aux.push(
					{
						id : $scope.arrayImpresion[i].id,
						codigo : $scope.arrayImpresion[i].codigo,
						producto : $scope.arrayImpresion[i].producto,
						precio : $scope.arrayImpresion[i].precio,
						factor : $scope.arrayImpresion[i].factor
					}
				)
			}
		};
		$scope.arrayImpresion = [];
		$scope.arrayImpresion = aux;

		if ($scope.arrayImpresion.length > 0) {
			$scope.disableImprimir = false;
		}else{
			$scope.disableImprimir = true;
		}
	}

	$scope.imprimir = function  () {
		setTimeout(function  () {
			var printContents = document.getElementById('impresion').innerHTML;
			var popupWin = window.open('', '_blank', 'width=600,height=600,left=500,top=200');
			popupWin.document.open();
			popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="" /> </head><body onload="window.print()">' + printContents + '</body></html>');
			popupWin.document.close();

			$scope.arrayImpresion = [];
		}, 2000)
	}


})
