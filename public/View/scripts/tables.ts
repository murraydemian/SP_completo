namespace SegundoParcial{
    export class Tables{
        public static Barbijos(lista : any, lado : string = 'izquierda'){            
            $('#titulo_' + lado).attr('style', 'display: none;');
            $('#tabla_' + lado).attr('style', 'display: block; padding-top:7mm;');
            let tablehead : string = '<th>COLOR</th> <th>TIPO</th> <th>PRECIO</th> <th></th> <th></th>';
            let usertable : string = '';
            lista.forEach(function(element) {
                
                usertable += '<tr><td>'+ element.color +'</td>'+
                '<td>'+ element.tipo +'</td>'+
                '<td>'+ element.precio +'</td>'+
                '<td>'+ Tables.BtnBorrar(element) +'</td>'+
                '<td>'+ Tables.BtnModificar(element) +'</td>';
            });
            $('#table_head_' + lado).html(tablehead);
            $('#table_body_' + lado).html(usertable);            
        }
        public static Usuarios(lista : any, lado : string = 'derecha'){
            $('#form_item').attr('style', 'display: none;');
            $('#titulo_' + lado).attr('style', 'display: none');
            $('#tabla_' + lado).attr('style', 'display: block; padding-top:7mm;');
            let tablehead : string = '<th>CORREO</th> <th>NOMBRE</th> <th>APELLIDO</th> <th>PERFIL</th> <th>FOTO</th>';
            let usertable : string = '';
            lista.forEach(function(element) {
                if(element.foto == null){
                    element.foto = './fotos/default-user-image.png';
                }
                usertable += /*'<tr> <td>'+ element.id +' </td>'+*/
                '<tr><td>'+ element.correo +'</td>'+
                '<td>'+ element.nombre +'</td>'+
                '<td>'+ element.apellido +'</td>'+
                '<td>'+ element.perfil +'</td>'+
                '<td><img src="./src'+ (<String>element.foto).substr(1) +'" height="50px" width="50px" /></td> </tr>';
            });
            $('#table_head_' + lado).html(tablehead);
            $('#table_body_' + lado).html(usertable);
        }
        public static BtnBorrar(item : any){
            let jsonstring = JSON.stringify(item);
            jsonstring = jsonstring.split('"').join("'");
            return '<button class="btn btn-danger border-light" onclick="SegundoParcial.Principal.BorrarItem(`'+ jsonstring +'`)">Borrar</button>';
        }
        public static BtnModificar(item : any){
            let jsonstring = JSON.stringify(item);
            jsonstring = jsonstring.split('"').join("'");
            return '<button class="btn btn-info border-light" onclick="SegundoParcial.Tables.FormModificar(`'+ jsonstring +'`)">Modificar</button>';
        }
        public static FormModificar(item : string, lado : string = 'derecha'){
            let obj = JSON.parse(item.split("'").join('"'));
            $('#titulo_' + lado).attr('style', 'display: none');
            $('#tabla_' + lado).attr('style', 'display: none; padding-top:7mm;');
            $('#inline_color').attr('class', 'form-inline align-content-center col-12 py-2');
            $('#form_item').attr('style', 'display: block;');
            $('#inline_id').attr('style', 'display: block;');
            $('#input_id').attr('value', obj.id);
            $('#input_tipo').attr('value', obj.tipo);
            $('#input_color').attr('value', obj.color);
            $('#input_precio').attr('value', obj.precio);
            $('#btn_succ_form').html('Modificar')
            $('#btn_succ_form').attr('onclick', 'SegundoParcial.Principal.ModificarItem()');
            $('#btn_warn_form').html('Cancelar')
            $('#btn_warn_form').attr('onclick', 'SegundoParcial.Principal.CancelarModificar()');
        }
        public static FormAgregar(lado : string = 'derecha'){
            $('#titulo_' + lado).attr('style', 'display: none');
            $('#tabla_' + lado).attr('style', 'display: none; padding-top:7mm;');
            $('#inline_color').attr('class', 'form-inline align-content-center col-12 py-2 pt-4');
            $('#form_item').attr('style', 'display: block;');
            $('#inline_id').attr('style', 'display: none;');
            $('#input_id').attr('value', null);
            $('#input_tipo').attr('value', null);
            $('#input_color').attr('value', null);
            $('#input_precio').attr('value', null);
            $('#btn_succ_form').html('Agregar')
            $('#btn_succ_form').attr('onclick', 'SegundoParcial.Principal.AgregarItem()');
            $('#btn_warn_form').html('Limpiar')
            $('#btn_warn_form').attr('onclick', 'SegundoParcial.Principal.LimpiarForm()');
        }
        public static UsuariosFiltrados(lista : any, lado : string = 'derecha'){
            console.log(lista);
            $('#titulo_' + lado).attr('style', 'display: none');
            $('#tabla_' + lado).attr('style', 'display: block; padding-top:7mm;');
            let tablehead : string = '<th>NOMBRE</th> <th>FOTO</th>';
            let usertable : string = '';
            lista.forEach(function(element) {
                if(element.foto == null){
                    element.foto = './fotos/default-user-image.png';
                }
                usertable += /*'<tr> <td>'+ element.id +' </td>'+*/
                '<tr><td>'+ element.nombre +'</td>'+
                '<td><img src="./src'+ (<String>element.foto).substr(1) +'" height="50px" width="50px" /></td> </tr>';
            });
            $('#table_head_' + lado).html(tablehead);
            $('#table_body_' + lado).html(usertable);
        }
    }
}