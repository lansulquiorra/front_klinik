@extends('layout.layout')
@section('title')
<title>Kasir .: Teknohealth :. </title>
<link rel="icon" href="assets/images/logo/logo-sm.png">
<link rel="stylesheet" type="text/css" href="assets/css/print-kasir.css" />
@endsection
@section('module-title')
<div class="module-left-title">
    <div class="module-left-bars"><i class="ti-menu"></i></div>
    <img src="assets/images/logo/pos-framasi.png">
    <span>Kasir</span>
</div>
@endsection
@section('nav')
    @include('layout.navKasir')
@endsection
@section('module-content-container')
<nav class="navbar navbar-static-top nav-title" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <ul>
                <h3>Kasir </h3>
            </ul>
        </div>
    </nav>
@endsection
@section('content')
<div ng-controller="KasirController">
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-12">
                <table id="example" class="ui teal celled table compact display nowrap" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nomor Rekam Medis</th>
                            <th>Nama Pasien</th>
                            <th>Tanggal Pendaftaran</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="k in tableListPayment">
                            <td>[[$index + 1]]</td>
                            <td>[[k.patient.number_medical_record]]</td>
                            <td>[[k.patient.full_name]]</td>
                            <td>[[k.displayedCreatedAt]]</td>
                            <td>[[k.displayedStatus]]</td>
                            <td>
                                <button class="btn btn-xs btn-default"
                                    ng-click="openModal('detaiPasienModal', 'lg', k)">
                                    <i class="fa fa-search-plus"></i> Detail Pasien
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script type="text/ng-template" id="detaiPasienModal">
        <div class="row p-b-15">
            <h4 class="modal-title">
                Tagihan
            </h4>
        </div>
        <div id="printKasir" class="row p-b-15 no-margin">
            <div class="col-md-12">
                <table class="table table-payment">
                    <thead>
                        <tr>
                            <th class="text-center">Nama</th>
                            <th class="text-center">Umur</th>
                            <th class="text-center">Jenis Kelamin</th>
                            <th class="text-center">Nomor Rekam Medis</th>
                            <th class="text-center">No Askes / Jamkesmas</th>
                            <th class="text-center">Telepon</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center">[[dataOnModal.patient.full_name]]</td>
                            <td class="text-center">[[dataOnModal.displayedAge]]</td>
                            <td class="text-center">[[dataOnModal.displayedGender]]</td>
                            <td class="text-center">[[dataOnModal.patient.number_medical_record]]</td>
                            <td class="text-center">[[dataOnModal.patient.askes_number]]</td>
                            <td class="text-center">[[dataOnModal.patient.phone_number]]</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-md-12 no-padding" ng-repeat="pp in dataOnModal.references">
                <div class="sub-title col-md-12">
                    <h4 class="text-left no-margin no-padding">[[pp.poly.name]]</h4>
                </div>
                <table class="table table-payment">
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 50px">No</th>
                            <th class="text-center">Jenis Pembayaran</th>
                            <th class="text-center">Jumlah</th>
                            <th class="text-center">Tarif</th>
                            <th class="text-right">Total Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="p in pp.payments">
                            <td class="text-center">[[$index + 1]]</td>
                            <td class="text-center" ng-show="p.service.name">[[p.service.name]]</td>
                            <td class="text-center" ng-hide="p.service.name">[[p.type]]</td>
                            <td class="text-center" ng-show="p.service">[[p.total/p.service.cost]]</td>
                            <td class="text-center" ng-hide="p.service">[[p.total/p.total]]</td>
                            <td class="text-center" ng-show="p.service.cost">[[p.service.cost]]</td>
                            <td class="text-center" ng-hide="p.service.cost">[[p.total]]</td>
                            <td class="text-right">[[p.total]]</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="4" class="text-left">Sub Total</th>
                            <th class="text-right">
                                <b>[[pp.reference_total_payment]]</b>
                            </th>
                        </tr>
                        <tr>
                        </tr>
                        <tr>
                        </tr>           
                    </tfoot>
                </table>
            </div>

            <div class="col-md-12 no-padding">
                <table class="table table-payment">
                    <thead>
                        <tr>
                            <th class="text-left"><b>Total</b></th>
                            <th class="text-right"><b>[[dataOnModal.totalPayments]]</b></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>

        <div class="row p-b-15 no-margin">
            <div class="col-md-3 pull-right">
                <button class="btn btn-primary col-md-12 no-radius pull-right"
                    ng-click="openModal('bayarModal', 'lg'); temp.payment = ''; temp.diff = '-'">
                    Bayar
                </button>
            </div>
            <div class="col-md-3 pull-right">
                <button class="btn btn-default col-md-12 no-radius pull-right"
                    ng-click="printArea('printKasir')">
                    <i class="fa fa-print"></i> Print
                </button>
            </div>
        </div>
    </script>
    <script type="text/ng-template" id="bayarModal">
        <div class="row p-b-15">
            <h4 class="modal-title">Pembayaran</h4>
        </div>
        <div class="row p-t-15">
            <div class="col-md-6 text-left">
                <div class="form-group field p-b-15 row">
                    <div class="col-md-4">
                        <p>Total Tagihan</p>
                    </div>
                    <div class="col-md-8" >
                        <input 
                            type="text" 
                            class="form-control"                            
                            ng-model="dataOnModal.totalPayments" 
                            readonly="true">                        
                    </div>
                </div>
                <div class="form-group field p-b-15 row">
                    <div class="col-md-4">
                        <p>Jumlah Bayar</p>
                    </div>
                    <div class="col-md-8" >
                        <input 
                            type="text" 
                            class="form-control"
                            name="payment"
                            ng-model="temp.payment"
                            ng-change="countPayments()">                        
                    </div>
                </div>
                <div class="form-group field p-b-15 row">
                    <div class="col-md-4">
                        <p>Diverensiasi</p>
                    </div>
                    <div class="col-md-8" >
                        <input 
                            type="text" 
                            class="form-control"
                            name="diff"
                            ng-model="temp.diff" 
                            readonly="true">                        
                    </div>
                </div>
            </div>
        </div>
        <div class="row p-t-15">            
            <button 
                class="btn btn-info col-md-3 no-radius" 
                ng-click="createKasirPayments()"
                ng-disabled="temp.diff<0||temp.diff=='-'||dataOnModal.totalPayments<=0">Bayar</button>
        </div>
    </script>
</div>
@endsection
@section('scripts')
<script src="views/kasir/kasir.js"></script>
@endsection
