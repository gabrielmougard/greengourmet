package ggrecipes.model;

import java.util.List; // import just the List interface
import java.util.ArrayList; // import just the ArrayList class
import java.util.Map; // import just the List interface
import java.util.HashMap;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.SilentCssErrorHandler;

//import static org.junit.Assert.assertNotNull;
public class GetRecipes {
    public List<String> steps = new ArrayList<String>();
    public String title;
    public String temps;
    public Float personnes;
    public String difficulte;
    public String cout;
    public List<String> ustensiles = new ArrayList<String>();
    public int status = 200;
    public Map<String, Float> ingredients = new HashMap<>();
    public Map<String, ArrayList<String>> recettes = new HashMap<>();

    private final String URLMarimitton = "https://www.marmiton.org/recettes/recherche.aspx";

    public ArrayList<Recette> GetRecipesDescription(ArrayList<String> ingredientRecette) {
        String urlMarmittonRecherche = URLBuilder(ingredientRecette);
        String start = "&start=";
        String page = "&page=";

        int nbrsElementParPage = 15;// default value
        int nbrsElementInt = 0;
        int compteurRecipiesExtract = 0;

        Boolean boolInitialisation = false;
        // ----------------------Initialisation with the first
        // page----------------------------
        WebClient webClient = webClientCreator();
        try {
            HtmlPage htmlMarmitton = (HtmlPage) webClient.getPage(urlMarmittonRecherche);
            status = htmlMarmitton.getWebResponse().getStatusCode();

            List<HtmlElement> nombreElement = htmlMarmitton.getByXPath("//span[(@class='recipe-search__nb-results')]");
            String nbrsElementStringResultat = nombreElement.get(0).asText();
            String SEPARATEUR = " ";
            String separateurTab[] = nbrsElementStringResultat.split(SEPARATEUR);
            String nbrsElementString = separateurTab[0];
            nbrsElementInt = Integer.parseInt(nbrsElementString);

            List<HtmlElement> recipies = htmlMarmitton.getByXPath("//div[(@class='recipe-card')]");
            nbrsElementParPage = recipies.size();
            compteurRecipiesExtract = compteurRecipiesExtract + recipies.size();

            boolInitialisation = true;

        } catch (Exception e) {
            status = 404;
        }
        // protection for memory leak
        webClient.close();
        // ----------------------END Initialisation with the first
        // page----------------------------

        // ------------------------------PARSE ALL
        // RESULT-----------------------------------
        ArrayList<Recette> recettes = new ArrayList<Recette>();
        if (boolInitialisation) {
            int requestLimit = 5;
            for (int i = 1; i < nbrsElementInt; i++) {
                WebClient wC = webClientCreator();
                if (i > requestLimit) {
                    break;
                }
                
                try {
                    String urlMarmittonRecherchePage = urlMarmittonRecherche + start + i * nbrsElementParPage + page
                            + i;
                    HtmlPage htmlMarmitton = (HtmlPage) wC.getPage(urlMarmittonRecherchePage);
                    status = htmlMarmitton.getWebResponse().getStatusCode();

                    //System.out.println(urlMarmittonRecherchePage);
                    List<HtmlElement> description = htmlMarmitton
                            .getByXPath("//div[(@class='recipe-card__description')]");
                    List<HtmlElement> titre = htmlMarmitton.getByXPath("//h4[(@class='recipe-card__title')]");
                    compteurRecipiesExtract = compteurRecipiesExtract + description.size();
                    // on récupère le texte ici
                    // on récupère le lien de chaque recette
                    List<HtmlAnchor> liens = htmlMarmitton.getByXPath("//a[(@class='recipe-card-link')]");
                    /*
                     * for (HtmlElement y : recipies) { System.out.println("Le Resume = ");
                     * System.out.println(y.asText()); System.out.println(); }
                     */
                   
                    Recette recette;
                    for (int w = 0; w < description.size(); w++) {
                        recette = new Recette();
                        recette.name = titre.get(w).asText();
                        recette.description = description.get(w).asText();
                        recette.MarmittonURL = "https://www.marmiton.org" + liens.get(w).getHrefAttribute();
                        /*
                         * System.out.println(titre.get(w).asText());
                         * System.out.println(description.get(w).asText());
                         * System.out.println("https://www.marmiton.org"
                         * +liens.get(w).getHrefAttribute()); System.out.println();
                         */
                        recettes.add(recette);
                    }
                } catch (Exception e) {
                    status = 404;
                }
                // protection for memory leak
                wC.close();
            }

        }

        // ------------------------------END PARSE ALL
        // RESULT-----------------------------------
        return recettes;
    }

    // fonction constuisant l'url de la recherche a partir de la liste d'ingredient
    // ---------return null si listIngerdient is empty
    private String URLBuilder(ArrayList<String> ingredientRecette) {
        String ingredientURLget = "aqt=";
        Boolean IngredientEmpty = false;
        if (ingredientRecette.isEmpty() == false) {
            ingredientURLget = ingredientURLget + ingredientRecette.get(0);

        } else {
            IngredientEmpty = true;
        }
        for (int i = 1; i < ingredientRecette.size(); i++) {
            ingredientURLget = ingredientURLget + "-" + ingredientRecette.get(i);
        }
        // String typeRecette="type=all";//Cela sera a preciser , ici on a la valeur par
        // default
        if (IngredientEmpty) {
            return null;
        } else {
            return URLMarimitton + "?" + ingredientURLget;
        }

    }

    private WebClient webClientCreator() {
        WebClient webClient = new WebClient();
        webClient.getOptions().setCssEnabled(true);
        webClient.setCssErrorHandler(new SilentCssErrorHandler());
        webClient.getOptions().setThrowExceptionOnFailingStatusCode(true);
        webClient.getOptions().setThrowExceptionOnScriptError(false);
        webClient.getOptions().setRedirectEnabled(false);
        webClient.getOptions().setAppletEnabled(false);
        webClient.getOptions().setJavaScriptEnabled(false);
        webClient.getOptions().setPopupBlockerEnabled(true);
        webClient.getOptions().setTimeout(5000);
        webClient.getOptions().setPrintContentOnFailingStatusCode(false);
        return webClient;
    }
}