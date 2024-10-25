import { OptionChoices } from "./Choices";
import { Localization } from "./Localizations";

export type Options = {
    type: number;
    name: string,
    value: string|boolean|number
    name_localizations?: Localization
    description: string,
    description_localizations?: Localization
    required?: boolean
    choices?: Array<OptionChoices>
    options?: Array<Options>
    channel_types?: Array<number>
    min_value?: BigInteger;
    max_value?: BigInteger;
    min_length?: BigInteger;
    max_length?: BigInteger;
    autocomplete?: boolean
}