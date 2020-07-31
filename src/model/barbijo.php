<?php
class Barbijo{
    public $id;
    public $color;
    public $tipo;
    public $precio;

    public function __construct($objJson){
        $this->id = isset($objJson->id) ? $objJson->id : -1;
        $this->color = $objJson->color;
        $this->tipo = $objJson->tipo;
        $this->precio = $objJson->precio;
    }

    public function GetStructure(){
        $structure = [0 => ['name' => 'color', 'value' => $this->color, 'type' => PDO::PARAM_STR],
                    1 => ['name' => 'tipo', 'value' => $this->tipo, 'type' => PDO::PARAM_STR],
                    2 => ['name' => 'precio', 'value' => $this->precio, 'type' => PDO::PARAM_INT]];
        return $structure;
    }
    public function GetId(){
        return ['name' => 'id', 'value' => $this->id, 'type' => PDO::PARAM_INT];
    }
    public static function VerifyTipo($obj, $valid = ['liso', 'estampado', 'transparente']){
        $ret = false;
        if(isset($obj, $valid) && in_array($obj->tipo, $valid)){$ret = true;}
        return $ret;
    }
    public function AddOne($request, $response){
        $jsonArgs = Authenticator::GetRequestJson($request);
        $objBarbijo = isset($jsonArgs) ? new Barbijo($jsonArgs) : null;
        if(Barbijo::VerifyTipo($objBarbijo) && DataAccess::AddOne('barbijos', $objBarbijo)){
            $responseJson['exito'] = true;
            $responseJson['mensaje'] = 'Se cargaron los datos.';
            $responseJson['status'] = 200;
        }else{
            if($jsonArgs == null){
                $responseJson['mensaje'] = 'Parametros insuficientes. Por favor use el formato {barbijo:"{\"ejemplo\":\"foo\"}"}';
            }else if(!Barbijo::VerifyTipo($objBarbijo)){
                $responseJson['mensaje'] = 'Tipo de barbijo invalido. Tipos validos: liso, estampado, transparente';
            }else{
                $responseJson['mensaje'] = 'Error en carga de datos.';
            }
            $responseJson['exito'] = false;
            $responseJson['status'] = 418;
        }
        $response->getBody()->write(json_encode($responseJson));
        return $response;
    }

    static function GetAll($request, $response){
        $items = DataAccess::GetAll('barbijos');
        if($items != null){
            $responseJson['exito'] = true;
            $responseJson['mensaje'] = 'Conexion exitosa.';
            $responseJson['tabla'] = $items;
            $responseJson['status'] = 200;            
        }else{
            $responseJson['exito'] = false;
            $responseJson['mensaje'] = 'Conexion fallida.';
            $responseJson['tabla'] = null;
            $responseJson['status'] = 424;
        }
        $response = isset($response) ? $response : new Response();
        $response->getBody()->write(json_encode($responseJson));
        return $response;
    }

    public static function Delete($request, $response){            
        $args = Authenticator::GetRequestJson($request);     
        if(Authenticator::AuthorizeProfiles($request, ['propietario','encargado','empleado']) && $args != null){
            $where = ['name' => 'id', 'value' => $args->id, 'type' => PDO::PARAM_INT];
            $ok = DataAccess::Delete('barbijos', $where);        
            if($ok){
                $responseJson['exito'] = true;
                $responseJson['mensaje'] = 'Item eliminado.';
                $responseJson['status'] = 200;
            }else{
                $responseJson['exito'] = false;
                $responseJson['mensaje'] = 'Item no existente.';
                $responseJson['status'] = 418;
            }
        }else{
            if($args == null){
                $responseJson['mensaje'] = 'Parametros insuficientes. Por favor use el formato {barbijo:"{id:#}"}';
            }else{
                $responseJson['mensaje'] = Authenticator::GetUser($request) . ' no esta autorizado a eliminar valores.';
            }
            $responseJson['exito'] = false;
            $responseJson['status'] = 418;
        }
        $response = isset($response) ? $response : new Response();
        $response->GetBody()->write(json_encode($responseJson));
        return $response;                
    }

    public function Modify($request, $response, $arg){
        $args = Authenticator::GetRequestJson($request);
        $objBarbijo = @new Barbijo($args);
        if(Barbijo::VerifyTipo($objBarbijo) && Authenticator::AuthorizeProfiles($request, ['propietario', 'encargado','empleado'])){
            if(DataAccess::Update('barbijos', $objBarbijo, $objBarbijo->GetId())){
                $responseJson['exito'] = true;
                $responseJson['mensaje'] = 'Se modificaron los datos.';
                $responseJson['status'] = 200;
            }else{
                $responseJson['exito'] = false;
                $responseJson['mensaje'] = 'Error en modificacion de datos.';
                $responseJson['status'] = 418;
            }
        }else{
            if(!Barbijo::VerifyTipo($objBarbijo)){
                $responseJson['mensaje'] = 'Tipo de barbijo invalido. Tipos validos: liso, estampado, transparente';
            }else{
                $responseJson['mensaje'] = 'Perfil invalido.';
            }
            $responseJson['exito'] = false;
            $responseJson['status'] = 418;
        }
        $response = isset($response) ? $response : new Response();
        $response->getBody()->write(json_encode($responseJson));
        return $response;
    }

}