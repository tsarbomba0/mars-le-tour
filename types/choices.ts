import { Localization } from "./Localizations";

export type OptionChoices = {
    name: string,
    name_localizations?: Localization,
    value: string|number|boolean,
}