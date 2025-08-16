<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    /** @var list<string> */
    protected $fillable = [
        'title',
        'description',
        'project_id',
    ];

    /** @return BelongsTo<Project::class> */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
