<?php

function GenerateRandomColor()
{
    $color = '#';
    $colorHexLighter = array("9", "A", "B", "C", "D", "E", "F");
    for ($x = 0; $x < 6; $x++):
        $color .= $colorHexLighter[array_rand($colorHexLighter, 1)];
    endfor;
    return substr($color, 0, 7);
}
