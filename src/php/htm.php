<?php

foreach (glob("./htm/*.htm") as $filename) {
  include_once $filename;
}
