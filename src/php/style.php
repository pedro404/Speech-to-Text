<?php

$dirIterator = new RecursiveDirectoryIterator("./css");
$iterator = new RecursiveIteratorIterator(
    $dirIterator,
    RecursiveIteratorIterator::SELF_FIRST
);

foreach ($iterator as $file) {
    if ($file->getExtension() == 'css') {
        // You probably have to adjust the full path according to your DOC_ROOT
        $url = $file->getPathname();

        $date = new DateTime("NOW");
        $dateFormat = $date->format("mdYHisu");

        echo '<link rel="stylesheet" href="' . $url . '?mx=' . $dateFormat . '">';
    }
}
