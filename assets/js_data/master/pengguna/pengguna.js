$(document).ready(function() {
	//Button Tambah
	$('#btn_tambah').click(function(){
		$('#frm').find('input:text, input:password, select, textarea').val('');
		$('#frm').find("input[type='hidden']", $(this)).val('');
        $('#frm').find('input:radio, input:checkbox').prop('checked', false);
	});
	//DataTable
	var myTable = 
	$('#dynamic-table')
	.DataTable({
		"bAutoWidth": false,
		"aaSorting": [],
		"bScrollCollapse": true,
		"aoColumnDefs": [
			{
				"aTargets":[0],
				"sWidth": "5%",
				"fnCreatedCell": function(c1){					   
					$(c1).css("text-align", "center");
				}
			},
			{
				"aTargets":[6],
				"sWidth": "10%",
				"fnCreatedCell": function(c1){					   
					$(c1).css("text-align", "center");
				}
			},
			{ "bVisible": false, "aTargets": [ 7 ] }
		],										
		"sAjaxSource": base_url+'admin/c_pengguna/get_json_data',			
		"bPaginate": true,		
		select: {
			style: 'single'
		}
	});
	
	myTable.on('order.dt search.dt', function () {
		myTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
			cell.innerHTML = i+1;
		} );
	}).draw();
	
	myTable.on('dblclick', 'tr', function (){
		var data = myTable.row( this ).data();
		//alert(data[3]);
		var s = '1';
		update(s,data[3]);
		$('#modal_add_new').modal('show');
	});
	
	$.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';
				
				new $.fn.dataTable.Buttons( myTable, {
					buttons: [
					  {
						"extend": "colvis",
						"text": "<i class='fa fa-search bigger-110 blue'></i> <span class='hidden'>Show/hide columns</span>",
						"className": "btn btn-white btn-primary btn-bold",
						columns: ':not(:first):not(:last)'
					  },
					  {
						"extend": "copy",
						"text": "<i class='fa fa-copy bigger-110 pink'></i> <span class='hidden'>Copy to clipboard</span>",
						"className": "btn btn-white btn-primary btn-bold"
					  },
					  {
						"extend": "csv",
						"text": "<i class='fa fa-database bigger-110 orange'></i> <span class='hidden'>Export to CSV</span>",
						"className": "btn btn-white btn-primary btn-bold"
					  },
					  {
						"extend": "excel",
						"text": "<i class='fa fa-file-excel-o bigger-110 green'></i> <span class='hidden'>Export to Excel</span>",
						"className": "btn btn-white btn-primary btn-bold"
					  },
					  {
						"extend": "pdf",
						"text": "<i class='fa fa-file-pdf-o bigger-110 red'></i> <span class='hidden'>Export to PDF</span>",
						"className": "btn btn-white btn-primary btn-bold"
					  },
					  {
						"extend": "print",
						"text": "<i class='fa fa-print bigger-110 grey'></i> <span class='hidden'>Print</span>",
						"className": "btn btn-white btn-primary btn-bold",
						autoPrint: false,
						message: 'This print was produced using the Print button for DataTables'
					  }	,
					  {
						"text": "<i class='fa fa-refresh'></i> <span class='hidden'>Refreh</span>",
						"className": "btn btn-white btn-primary btn-bold",
						action: function ( e, dt, node, config ) {
							dt.ajax.reload();
						}
					  }
					]
				} );
				
				myTable.buttons().container().appendTo( $('.tableTools-container') );
				
				//style the message box
				var defaultCopyAction = myTable.button(1).action();
				myTable.button(1).action(function (e, dt, button, config) {
					defaultCopyAction(e, dt, button, config);
					$('.dt-button-info').addClass('gritter-item-wrapper gritter-info gritter-center white');
				});
				
				var defaultColvisAction = myTable.button(0).action();
				myTable.button(0).action(function (e, dt, button, config) {
					defaultColvisAction(e, dt, button, config);
					if($('.dt-button-collection > .dropdown-menu').length == 0) {
						$('.dt-button-collection')
						.wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
						.find('a').attr('href', '#').wrap("<li />")
					}
					$('.dt-button-collection').appendTo('.tableTools-container .dt-buttons')
				});
});

function rem(frm,id){
	bootbox.confirm("Anda yakin akan menghapus data ini?", function(result) {						
		if(result) {
			window.location.href='c_pengguna/delete_data/'+frm+'/'+id;
		}
	});
}


$('#btn_save').on('click',function(){
	var id = $('#fld1').val();
	var name = $('#fld2').val();
	var username = $('#fld3').val();
	var password = $('#fld4').val();
	var email = $('#fld5').val();
	var hp = $('#fld6').val();
	if(password !="" && name !='' && username !='' && email !=''){
		$.ajax({
			type : "POST",
			url  : base_url+'admin/c_pengguna/add_data',
			dataType : "JSON",
			data : {id:id, name:name, username:username, password:password, email:email, hp:hp},
			success: function(data){
				console.log(data);
				if(data.status == 'terdaftar'){
					alert('Username atau email sudah terdaftar..!!');
				}
				$('#modal_add_new').modal('hide');
				$('#dynamic-table').DataTable().ajax.reload(null, false);
			}
		});
		return false;
	}else{
		alert("Lengkapi Form (*)");
	}
});

function update(frm,id){
	$.ajax({
		url: base_url+'admin/c_pengguna/cari_rec',
		method: 'GET',
		data: { 
			id: id,
			frm: frm
		},
		success:function(result) {
			$("input[name='fld1']").val(id);
			//console.log(result);
			var res = JSON.parse(result);
			res.forEach(addFill);
		}
	});
}

function addFill(item, index){
	if(item.fld.substring(0,3) == "img"){
		$(item.fld).load(item.fld);	
		$(item.fld).attr('src',item.val);
	} else if(item.fld.substring(0,5) == "table"){
		$(item.fld).html(item.val);
	} else if(item.fld.substring(0,4) == "span"){
		$(item.fld).html(item.val);
	} else if(item.fld.substring(0,1) != ""){
		$(item.fld).val(item.val);
	}
}