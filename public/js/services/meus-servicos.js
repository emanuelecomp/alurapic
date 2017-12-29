angular.module('meusServicos',['ngResource'])
.factory('recursoFoto',function($resource){
    return $resource('/v1/fotos/:fotoId', null, {
        'update' : { 
            method: 'PUT'
        }
    });
})
.factory('cadastroDeFotos',function(recursoFoto,$q){
    
    var servico = {};
    
    servico.cadastrar = function(foto){ 

        return $q(function(resolve, reject){
            if(foto._id){
                recursoFoto.update({fotoId: foto._id},foto,function(){
                    resolve({
                        mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso.',
                        inclusao: false
                    });
                },function(erro){
                    console.log(erro);
                    reject({
                        mensagem: 'Foto ' + foto.titulo + ' não atualizada.'
                    });
                });
            }else{
                recursoFoto.save(foto,function(){
                    resolve({
                        mensagem: 'Foto ' + foto.titulo + ' incluída com sucesso.',
                        inclusao: true
                    });
                },function(erro){
                    console.log(erro);
                    reject({
                        mensagem: 'Foto ' + foto.titulo + ' não inserida.'
                    });
                });
            }
        });

    };

    return servico;
});