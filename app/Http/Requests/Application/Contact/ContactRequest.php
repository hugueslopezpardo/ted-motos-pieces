<?php

namespace App\Http\Requests\Application\Contact;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'message' => ['required', 'string'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages()
    {
        return [
            'name.required' => 'Le champ nom est obligatoire',
            'name.string' => 'Le champ nom doit être une chaîne de caractères',
            'name.max' => 'Le champ nom ne doit pas dépasser 255 caractères',
            'email.required' => 'Le champ email est obligatoire',
            'email.string' => 'Le champ email doit être une chaîne de caractères',
            'email.lowercase' => 'Le champ email doit être en minuscules',
            'email.email' => 'Le champ email doit être une adresse email valide',
            'email.max' => 'Le champ email ne doit pas dépasser 255 caractères',
            'message.required' => 'Le champ message est obligatoire',
            'message.string' => 'Le champ message doit être une chaîne de caractères',
        ];
    }

}
