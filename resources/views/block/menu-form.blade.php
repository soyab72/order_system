<div class="modal" tabindex="-1" role="dialog" id="menu-form-modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Create Order</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="mx-auto p-2 m-2">
                        <form>
                            <div class="form-group">
                                <label>Item name</label>
                                <input type="text" class="form-control" id="item-name" placeholder="Enter Item Name">
                                <span class="text-danger" id="item-validate"></span>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Price</label>
                                <input type="number" class="form-control" id="price" placeholder="Enter Price">
                                <span class="text-danger" id="price-validate"></span>
                            </div>
                            <input type="hidden" value="" id="index" name="index">
                            <input type="hidden" value="" id="current_row" name="row">
                            <input type="hidden" value="" id="current_column" >
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="make-order" class="btn btn-success">Make Order</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
