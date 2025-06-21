<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
        public function update(Request $request): RedirectResponse
        {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
            ]);

            $user = $request->user();
            $user->name = $request->input('name');
            $user->save();

            return back();
        }
}
