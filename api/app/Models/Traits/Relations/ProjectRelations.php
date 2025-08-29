<?php

namespace App\Models\Traits\Relations;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait ProjectRelations
{
    /** @return BelongsTo<User, Project> */
    public function user(): BelongsTo
    {
        /** @var BelongsTo<User, Project> */
        return $this->belongsTo(User::class);
    }
}
