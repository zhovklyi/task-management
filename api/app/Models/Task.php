<?php

namespace App\Models;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property ?string $description
 * @property int $project_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Task extends Model
{
    /** @var list<string> */
    protected $fillable = [
        'title',
        'description',
        'project_id',
        'status',
    ];

    protected $casts = [
        'status' => TaskStatus::class,
    ];

    /** @return BelongsTo<Project, Task> */
    public function project(): BelongsTo
    {
        /** @var BelongsTo<Project, Task> */
        return $this->belongsTo(Project::class);
    }
}
