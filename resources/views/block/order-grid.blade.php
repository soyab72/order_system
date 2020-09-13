<?php
$index = 1;
?>
@if(!empty($rowValue) && !empty($columnValue) && intval($rowValue) > 0 && intval($columnValue) > 0)
    <div class="overflow-auto">
        @for ($row = 1; $row <= $rowValue; $row++)
            <div class="row m-0">
                <div class="ml-2 mx-auto data-box text-cell d-flex">
                    @for ($column = 1; $column <= $columnValue; $column++)
                        <div data-rowVal="{{$rowValue}}" data-columnVal="{{$columnValue}}"
                             class="col-sm min-width-box text-justify text-secondary border m-2 p-3 text-center font-weight-bold @if(!isset($menuData[$index]['item'])) open-menu-modal @endif"
                             @if(!isset($menuData[$index]['item']))  data-toggle="modal" data-target="#menu-form-modal"
                             data-index="{{$index}}"
                             style="min-width: 150px;"
                             @else style="background-color: <?php echo GenerateRandomColor(); ?>; min-width: 150px;"
                             @endif id="tile_{{$index}}">
                            @if(isset($menuData[$index]['item']))
                                {{ Illuminate\Support\Str::limit($menuData[$index]['item'], 12, $end='...') }}
                            @else
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            @endif
                        </div>
                        <?php $index++ ?>
                    @endfor
                </div>
            </div>
        @endfor
    </div>
@endif
