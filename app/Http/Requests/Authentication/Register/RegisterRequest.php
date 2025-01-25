<?php

namespace App\Http\Requests\Authentication\Register;

use App\Models\User\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255', // Prénom
            'last_name' => 'required|string|max:255', // Nom
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone_number' => 'required|string|min:10|max:15', // Numéro de téléphone
            'location_region_id' => 'required|exists:location_regions,id', // ID de région
            'location_department_id' => 'required|exists:location_departments,id', // ID de département
            'postal_code' => 'required|string|min:4|max:10', // Code postal
            'address' => 'required|string|max:255', // Adresse
            'city' => 'required|string|max:255', // Ville
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'Veuillez entrer un prénom.',
            'first_name.max' => 'Le prénom ne peut pas dépasser 255 caractères.',
            'last_name.required' => 'Veuillez entrer un nom.',
            'last_name.max' => 'Le nom ne peut pas dépasser 255 caractères.',
            'email.required' => 'Veuillez entrer une adresse email.',
            'email.unique' => 'Cette adresse email est déjà utilisée.',
            'email.email' => 'Veuillez entrer une adresse email valide.',
            'email.lowercase' => 'Veuillez entrer une adresse email en minuscules.',
            'phone_number.required' => 'Veuillez entrer un numéro de téléphone.',
            'phone_number.min' => 'Votre numéro de téléphone doit contenir au moins 10 caractères.',
            'phone_number.max' => 'Votre numéro de téléphone ne peut pas dépasser 15 caractères.',
            'location_region_id.required' => 'Veuillez sélectionner une région.',
            'location_region_id.exists' => 'La région sélectionnée est invalide.',
            'location_department_id.required' => 'Veuillez sélectionner un département.',
            'location_department_id.exists' => 'Le département sélectionné est invalide.',
            'postal_code.required' => 'Veuillez entrer un code postal.',
            'postal_code.min' => 'Le code postal doit contenir au moins 4 caractères.',
            'postal_code.max' => 'Le code postal ne peut pas dépasser 10 caractères.',
            'address.required' => 'Veuillez entrer une adresse.',
            'address.max' => 'L’adresse ne peut pas dépasser 255 caractères.',
            'city.required' => 'Veuillez entrer une ville.',
            'city.max' => 'Le nom de la ville ne peut pas dépasser 255 caractères.',
            'password.confirmed' => 'Les mots de passe ne correspondent pas.',
            'password.required' => 'Veuillez entrer un mot de passe.',
            'password.min' => 'Votre mot de passe doit contenir au moins :min caractères.',
            'password.max' => 'Votre mot de passe ne peut pas dépasser :max caractères.',
        ];
    }
}
