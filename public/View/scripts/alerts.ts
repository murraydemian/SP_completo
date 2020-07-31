
namespace SegundoParcial{
    export class Alerts{

        public static Danger(strong : string, normal : string, cols : number = 4){
            return '<div class="alert alert-danger alert-dismissible fade show col-'+ cols +'" role="alert">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<strong>' + strong + '</strong> ' + normal +
                    '</div>';
        }
        public static Warning(strong : string, normal : string, cols : number = 4){
            return '<div class="alert alert-warning alert-dismissible fade show col-'+ cols +'" role="alert">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<strong>' + strong + '</strong> ' + normal +
                    '</div>';
        }
        public static Success(strong : string, normal : string, cols : number = 4){
            return '<div class="alert alert-success alert-dismissible fade show col-'+ cols +'" role="alert">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<strong>' + strong + '</strong> ' + normal +
                    '</div>';
        }
        public static Info(strong : string, normal : string, cols : number = 4){
            return '<div class="alert alert-info alert-dismissible fade show col-'+ cols +'" role="alert">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<strong>' + strong + '</strong> ' + normal +
                    '</div>';
        }
    }
}