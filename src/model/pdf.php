<?php
class PDFGenerator{
    public static function List($request, $response, $params){
        if($params['tipo'] === "usuarios"){
            $lista = DataAccess::GetAll('usuarios');
            $inner = PDFGenerator::Usuarios($lista);

        }else if($params['tipo'] === "barbijos"){
            $lista = DataAccess::GetAll('barbijos');
            $inner = PDFGenerator::Barbijos($lista);
        }else{
            $lista = null;
        }
        if($lista != null){
            $mpdf = new \Mpdf\Mpdf([
                ['orientation' => 'P', 
                'pagenumPrefix' => 'Página nro. ',
                'pagenumSuffix' => ' - ',
                'nbpgPrefix' => ' de ',
                'nbpgSuffix' => ' páginas']
            ]);
            $mpdf->SetHeader('Suarez Murray, Demian Jose|{PAGENO}| RSP');
            $mpdf->SetFooter(date('Y/m/d'));
            $mpdf->WriteHTML($inner);
            $filename = time();
            $mpdf->Output('../' . $filename . '.pdf', 'F');
            $res['exito'] = true;
            $res['status'] = 200;
            $res['mensaje'] = 'src/' . $filename . '.pdf';
        }else{
            $res['exito'] = false;
            $res['status'] = 403;
            $res['mensaje'] = 'No se pudo crear el archivo.';
        }
        $response->getBody()->write(json_encode($res));
        return $response;
    }
    public static function Usuarios($lista){
        $innerHtml = '<table><tr> <th>ID</th> <th>Nombre</th> <th>Apellido</th> <th>Correo</th> <th>Perfil</th> <th>Foto</th> </tr><tbody>';
        foreach($lista as $user){
            $line = '<tr> <td>'.$user->id.'</td> <td>'.$user->nombre.'</td> <td>'.$user->apellido.'</td> <td>'.$user->correo.'</td> <td>'.$user->perfil.'</td> <td><img src="'. $user->foto .'"/></td> </tr>';
            $innerHtml .= $line;
        }
        return $innerHtml . '</tbody></table>';
    }
    public static function Barbijos($lista){
        $innerHtml = '<table><tr> <th>ID</th> <th>Color</th> <th>Tipo</th> <th>Precio</th> </tr> <tbody>';
        foreach($lista as $user){
            $innerHtml .= '<tr> <td>'.$user->id.'</td>'.
                    '<td>'.$user->color.'</td>'.
                    '<td>'.$user->tipo.'</td>'.
                    '<td>'.$user->precio.'</td> </tr>';
        }
        return $innerHtml . '</tbody></table>';
    }
}