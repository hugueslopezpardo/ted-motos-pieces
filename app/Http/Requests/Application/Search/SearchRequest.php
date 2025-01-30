<?php

namespace App\Http\Requests\Application\Search;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
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
            'search_query' => 'string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'search_query.required' => 'Veuillez entrer une chaîne de caractères.',
            'search_query.string' => 'Veuillez entrer une chaîne de caractères valide.',
            'search_query.max' => 'La chaîne de caractères ne doit pas dépasser 255 caractères.',
        ];
    }

}
