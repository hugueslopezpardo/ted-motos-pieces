<?php

namespace App\Http\Requests\Application\Checkout;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'city' => ['required', 'string'],
            'postal_code' => ['required', 'string'],
            'address' => ['required', 'string'],
            'delivery_service' => ['required', 'numeric'],
            'delivery_price' => ['required', 'numeric'],
            'total_price' => ['required'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'city.required' => 'La ville est obligatoire',
            'postal_code.required' => 'Le code postal est obligatoire',
            'address.required' => 'L\'adresse est obligatoire',
            'address.string' => 'L\'adresse doit être une chaîne de caractères',
            'delivery_service.required' => 'Le service de livraison est obligatoire',
            'delivery_price.required' => 'Le prix de la livraison est obligatoire',
            'delivery_price.numeric' => 'Le prix de la livraison doit être un nombre',
            'total_price.required' => 'Le prix total est obligatoire',
        ];
    }

}
