<?php

namespace App\Http\Requests\Application\Profile;

use App\Models\User\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'phone_number' => ['required', 'string', 'max:255'],
            'location_region_id' => ['required', 'integer', 'exists:location_regions,id'],
            'location_department_id' => ['required', 'integer', 'exists:location_departments,id'],
            'postal_code' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Le nom est obligatoire.',
            'email.required' => 'L\'adresse email est obligatoire.',
            'email.email' => 'L\'adresse email doit être une adresse valide.',
            'email.unique' => 'L\'adresse email est déjà utilisée.',
            'phone_number.required' => 'Le numéro de téléphone est obligatoire.',
            'location_region_id.required' => 'La région est obligatoire.',
            'location_department_id.required' => 'Le département est obligatoire.',
            'postal_code.required' => 'Le code postal est obligatoire.',
            'address.required' => 'L\'adresse est obligatoire.',
            'city.required' => 'La ville est obligatoire.',
        ];
    }

}
