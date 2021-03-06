@extends('layout.layout')
@section('title')
<title>kepegawaian .: Teknohealth :. </title>
<link rel="icon" href="assets/images/logo/logo-sm.png">
@endsection
@section('module-title')
<div class="module-left-title">
    <div class="module-left-bars"><i class="ti-menu"></i></div>
    <img src="assets/images/logo/kepegawaian.png">
    <span>KEPEGAWAIAN</span>
</div>
@endsection
@section('nav')
   @include('layout.navMasterData')
@endsection
@section('module-content-container')
            <nav class="navbar navbar-static-top nav-title" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <ul>
                <h3>Jasa Dokter</h3>
            </ul>
        </div>
    </nav>
@endsection
@section('content')
    <div id="staffJob-area" ng-controller="StaffCtrl" >
        <div class="row no-margin">
            <div class="col-md-12 no-padding m-b-15">
                <a class="btn btn-info col-md-3 no-radius" href="{{url('createjasaDokter')}}"> Tambah Jasa Dokter</a>
            </div>
            <div class="col-md-12">
                <table id="example" class="ui teal celled table compact display nowrap" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Doktor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="staff in tableListStaff">
                            <td>[[$index + 1]]</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
<script src="views/jasaDokter/jasaDokter.js"></script>
@endsection
