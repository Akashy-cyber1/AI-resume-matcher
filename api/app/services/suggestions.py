def generate_fallback_suggestions(score: int, missing_keywords: list[str]) -> list[str]:
    suggestions = []

    if score < 40:
        suggestions.append("Resume ko JD ke hisaab se strongly tailor karo.")
    elif score < 70:
        suggestions.append("Projects, skills aur measurable impact ko aur clearly align karo.")
    else:
        suggestions.append("Resume alignment achha hai, bas JD-specific wording improve karo.")

    if missing_keywords:
        suggestions.append(
            "In keywords ko natural way me add karo: " + ", ".join(missing_keywords[:8])
        )

    suggestions.append("Skills section me exact tools aur frameworks likho.")
    suggestions.append("Project bullets me action + tool + impact format use karo.")
    suggestions.append("Resume summary ko target role ke according rewrite karo.")

    return suggestions[:5]