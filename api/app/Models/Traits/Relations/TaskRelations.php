<?php

namespace App\Models\Traits\Relations;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait TaskRelations
{
    /** @return BelongsTo<Project, Task> */
    public function project(): BelongsTo
    {
        /** @var BelongsTo<Project, Task> */
        return $this->belongsTo(Project::class);
    }
}
