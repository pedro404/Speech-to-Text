<?php

$dirIterator = new RecursiveDirectoryIterator("./js/");
$iterator = new RecursiveIteratorIterator(
  $dirIterator,
  RecursiveIteratorIterator::SELF_FIRST
);

foreach ($iterator as $file) {
  if ($file->getExtension() == 'js') {
    // You probably have to adjust the full path according to your DOC_ROOT
    $url = $file->getPathname();

    $date = new DateTime("NOW");
    $dateFormat = $date->format("mdYHisu");

    echo '<script src="' . $url . '?mx=' . $dateFormat . '"></script>';
  }
}
