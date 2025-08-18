<?php

namespace App\Enums;

enum TaskStatus: string
{
    case OPEN = 'open';

    case IN_PROGRESS = 'in-progress';

    case DONE = 'done';
}
