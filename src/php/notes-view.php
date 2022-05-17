<?php
$files = glob("../archiv/*.txt");

$files = array_reverse($files);

foreach ($files as $file) {
        $content = file_get_contents($file);

        $allContent .= '<div class="note-box"><div class="note-box-one">' . strstr($content, "\r\n", true) .
                '</div>';
        $allContent .= '<div class="note-box-two">' . strstr($content, "\r\n") .
                '</div></div>';
}

echo $allContent;
