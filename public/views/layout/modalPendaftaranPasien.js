'use strict';

angular.module('adminApp')
    .controller('ModalPendaftaranPasienCtrl', function(
        $scope, 
        $http, 
        $rootScope, 
        ngDialog, 
        ServicesAdmin,
        ServicesCommon,
        moment
    ) {        
        var defaultDataCreatePasien = function () {
            var data = {
                age: $scope.temp.age
            }
            return data;
        }

        $scope.currHour = moment().format('HH:mm');

        $scope.printArea = function (divID) {
            if (!$scope.temp.duration) {
                $scope.temp.duration = 0;
            }
            $scope.temp.endDate = moment($scope.temp.startDate).add('days', $scope.temp.duration).format('DD-MM-YYYY');
            $scope.todayDate = moment().format('DD MMMM YYYY');
            setTimeout(function(){
                var printContents = document.getElementById(divID).innerHTML;
                var popupWin = window.open('', '_blank', 'width=800, height=600');
                popupWin.document.open();
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
                popupWin.document.close();
            }, 500);
        } 

        $scope.createNewPendaftaranPasien = function () {
            $scope.message.createLoketRegisters = {};
    
            var data = {
                kiosk_id: $scope.kiosk_id,                
                number_medical_record: $scope.temp.number_medical_record,
                full_name: $scope.temp.full_name,
                place: $scope.temp.place,
                birth: moment($scope.temp.birth).format("DD/MM/YYYY"),
                gender: $scope.temp.gender.value,
                address: $scope.temp.address,
                religion: $scope.temp.religion,
                province: $scope.temp.province.code,
                city: $scope.temp.city.code,
                district: $scope.temp.district.code,
                subDistrict: $scope.temp.subDistrict.code,
                rt_rw: $scope.temp.rt_rw,
                phone_number: $scope.temp.phone_number,
                last_education: $scope.temp.last_education,
                job: $scope.temp.job,
                askes_number: $scope.temp.askes_number,
                poly_id: $scope.temp.poly.id,
                doctor_id: $scope.temp.doctor.id
            }

            var defaultData = defaultDataCreatePasien();

            var param = Object.assign(data, defaultData);

            serviceCreatePendaftaran(param);
        }

        $scope.createOldPendaftaranPasien = function () {
            $scope.message.createLoketRegisters = {};

            var data = {
                kiosk_id: $scope.kiosk_id,
                patient_id: $scope.patient_id,            
                poly_id: $scope.temp.poly.id,
                doctor_id: $scope.temp.doctor.id
            }

            var defaultData = defaultDataCreatePasien();

            var param = Object.assign(data, defaultData);

            serviceCreatePendaftaran(param);            
        }

        var serviceCreatePendaftaran = function (param) {
            ServicesAdmin.createLoketRegisters(param).$promise
            .then(function (result) {
                if (!result.isSuccess) {
                    return $scope.message.createLoketRegisters.error = result.message;
                };

                $scope.temp.poliquenumber = "12";
                $scope.result = result;
                ngDialog.closeAll();
                $scope.printArea('printRegister');
            });
        }

        $scope.searchPasien = function () {
            var params = {
                data: $scope.temp.query
            };

            ServicesAdmin.getLoketPendaftaranPatient(params).$promise
            .then(function (result) {
                $scope.temp.patients = result.datas.patient;
            });
        }

        $scope.oldPatient = function () {
            if ($scope.temp.patient) {
                $scope.temp.number_medical_record = $scope.temp.patient.number_medical_record;
                $scope.temp.full_name = $scope.temp.patient.full_name;
                $scope.temp.place = $scope.temp.patient.place;
                $scope.temp.birth = new Date($scope.temp.patient.birth);
                $scope.temp.age = moment().diff($scope.temp.birth, 'years');
                $scope.temp.address = $scope.temp.patient.address;
                $scope.temp.religion = $scope.temp.patient.religion;
                $scope.temp.rt_rw = $scope.temp.patient.rt_rw;
                $scope.temp.phone_number = $scope.temp.patient.phone_number;
                $scope.temp.last_education = $scope.temp.patient.last_education;            
                $scope.temp.askes_number = $scope.temp.patient.askes_number;
                $scope.patient_id = $scope.temp.patient.id;

                $scope.provinces.forEach(function (val) {
                    if (val.code == $scope.temp.patient.province) {
                        return $scope.temp.province = val;
                    }
                });
                $scope.cities.forEach(function (val) {
                    if (val.code == $scope.temp.patient.city) {
                        return $scope.temp.city = val;
                    }
                });
                $scope.districts.forEach(function (val) {
                    if (val.code == $scope.temp.patient.district) {
                        return $scope.temp.district = val;
                    }
                });
                $scope.subDistricts.forEach(function (val) {
                    if (val.code == $scope.temp.patient.subDistrict) {
                        return $scope.temp.subDistrict = val;
                    }
                });
                $scope.defaultValues.gender.forEach(function (val) {
                    if (val.value == $scope.temp.patient.gender) {
                        return $scope.temp.gender = val;
                    }
                });
                $scope.defaultValues.listJobs.forEach(function (val) {
                    if (val.value == $scope.temp.patient.job) {
                        return $scope.temp.job = val;
                    }
                });
            }
        }

        $scope.getAge = function () {
            $scope.temp.age = moment().diff($scope.temp.birth, 'years');
        }

        $scope.getDoctor = function () {
            $scope.listPoli.forEach(function(item) {
                if (item.id == $scope.temp.poly.id && item.doctors) {
                    $scope.listDoctor = item.doctors;
                }
            });
        }

        $scope.getListPoli = function () {
            ServicesCommon.getPolies().$promise
            .then(function (result) {
                $scope.listPoli = result.datas.polies;
            });
        }

        $scope.getListProvinces = function () {
            ServicesCommon.getProvinces().$promise
            .then(function (result) {
                $scope.provinces = result.datas.provinces;
            });
        }

        $scope.getListCities = function () {
            ServicesCommon.getCities().$promise
            .then(function (result) {
                $scope.cities = result.datas.cities;
            });
        }

        $scope.getListDistricts = function () {
            ServicesCommon.getDistricts().$promise
            .then(function (result) {
                $scope.districts = result.datas.districts;
            });
        }
        $scope.getListSubDistricts = function () {
            ServicesCommon.getSubDistricts().$promise
            .then(function (result) {
                $scope.subDistricts = result.datas.subDistricts;
            });
        }

        var getDefaultValues = function() {
            return $http.get('views/config/defaultValues.json').then(function(data) {                
                $scope.genders = data.data.gender;                
            });            
        };

        var getSSRl4b = function () {
            return $http.get('views/config/defaultSSRjalanRl4b.json').then(function(data) {                
                $scope.defaultSSRjalanRl4b = data.data;                
            });
        }

        var firstInit = function () {
            getDefaultValues();
            getSSRl4b();
            $scope.getListProvinces();
            $scope.getListCities();
            $scope.getListDistricts();
            $scope.getListSubDistricts();
        }

        firstInit();        
    });