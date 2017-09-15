(function(){
    "use strict";

    angular.module('alumnos', [])
        .controller('alumnosCtr', alumnosLista);

    alumnosLista.$inject = ['$http'];
    
    function alumnosLista($http)
    {
        var vm = this;
        vm.Titulo = "Listado de Alumnos";
        vm.ListaAlumnosInfo = [];
        vm.getAlumnos = getAlumnos;
        vm.addAlumno = addAlumno;
        vm.editAlumno = editAlumno;
        vm.updateAlumno = updateAlumno;
        vm.deleteAlumno = deleteAlumno;

        getAlumnos();

        function addAlumno()
        {
            console.log('addAlumno');
            console.log(vm.alumno);

            $http.post('/getAlumnos', vm.alumno).then(

                function (res){
                    console.log(res);
                    getAlumnos();
                    vm.alumno = '';
                },
                function (err){
                    console.log(err);
                }
            );
        }

        function editAlumno(id)
        {
            console.log('editAlumno: ' + id);

            $http.get('/getOne/' + id).then(

                function (res){
                    vm.alumno = res.data;
                },
                function (err){
                    console.log(err);
                }
            );
        }

        function updateAlumno(id)
        {
            console.log('updateAlumno: ' + id);

            $http.put('/updateAlumno/' + id, vm.alumno).then(

                function(res){
                    console.log(res);
                    getAlumnos();
                    vm.alumno = '';
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function deleteAlumno(id)
        {
            console.log('deleteAlumno: ' + id);

            $http.delete('/getAlumnos/' + id).then(

                function(res){
                    console.log(res);
                    getAlumnos();
                },
                function(err){
                    console.log(err);
                }
            );
        }

        function getAlumnos()
        {
            $http.get('/getAlumnos').then(

                function (res){

                    vm.ListaAlumnosInfo = res.data;
                },
                function (err){
                    console.log(err);
                }
            )
        }     

    }

})();