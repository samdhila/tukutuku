<div class="main-content">
	<div class="main-content-inner">
		<div class="breadcrumbs ace-save-state" id="breadcrumbs">
			<ul class="breadcrumb">
				<li>
					<i class="ace-icon fa fa-home home-icon"></i>
					<li class="active">Dashboard</li>
				</li>
			</ul><!-- /.breadcrumb -->			
		</div>
		<div class="page-content">
			<div class="row">
				<div class="col-xs-12">
					<h3 class="header smaller lighter blue">Unit</h3>
				</div>
			</div>
			<div class="clearfix">
				<button class="btn btn-white btn-info btn-bold" data-toggle="modal" data-target="#modal_add_new" id="btn_tambah">
					<i class="ace-icon fa fa-pencil-square-o bigger-120 blue"></i>
					Tambah
				</button>
				<div class="pull-right tableTools-container"></div>
			</div>
			<div class="table-header">
				Results for "Unit"
			</div>
			<div class="row">
				<div class="col-xs-12">
				<table id="dynamic-table" class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th style="text-align:center;">No</th>
							<th>Kategori</th>
							<th style="text-align:center;">Aksi</th>
						</tr>
					</thead>

					<tbody style="cursor: pointer;">
						<tr>
							<td></td>
						</tr>
					</tbody>
				</table>
				</div>
			</div>
			
			<div class="modal fade" id="modal_add_new" tabindex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                <h3 class="modal-title" id="myModalLabel">Master Unit</h3>
            </div>
            <form class="form-horizontal" id="frm" method="post" action="<?php  echo base_url('admin/c_unit/add_data');?>">
                <div class="modal-body">
 
                    <div class="form-group">
                        <label class="control-label col-xs-3" >Unit</label>
                        <div class="col-xs-8">
							<input type="hidden" name="fld1" id="fld1" class="form-control text-uppercase" value="">
                            <input name="fld2" id="fld2" class="form-control text-uppercase" type="text" placeholder="Unit..." required>
                        </div>
                    </div>
  
                </div>
 
                <div class="modal-footer">
                    <button class="btn" data-dismiss="modal" aria-hidden="true">Tutup</button>
                    <button class="btn btn-info" id="btn_save_unit">Simpan</button>
                </div>
            </form>
            </div>
            </div>
        </div>
		
		</div>
	</div>
</div>