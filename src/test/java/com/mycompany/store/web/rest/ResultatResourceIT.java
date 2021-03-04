package com.mycompany.store.web.rest;

import com.mycompany.store.Test11App;
import com.mycompany.store.domain.Resultat;
import com.mycompany.store.repository.ResultatRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.store.domain.enumeration.Mention;
/**
 * Integration tests for the {@link ResultatResource} REST controller.
 */
@SpringBootTest(classes = Test11App.class)
@AutoConfigureMockMvc
@WithMockUser
public class ResultatResourceIT {

    private static final Long DEFAULT_NOTE = 1L;
    private static final Long UPDATED_NOTE = 2L;

    private static final Mention DEFAULT_MENTION = Mention.ACCEPTE;
    private static final Mention UPDATED_MENTION = Mention.ENTRETIEN;

    @Autowired
    private ResultatRepository resultatRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restResultatMockMvc;

    private Resultat resultat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Resultat createEntity(EntityManager em) {
        Resultat resultat = new Resultat()
            .note(DEFAULT_NOTE)
            .mention(DEFAULT_MENTION);
        return resultat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Resultat createUpdatedEntity(EntityManager em) {
        Resultat resultat = new Resultat()
            .note(UPDATED_NOTE)
            .mention(UPDATED_MENTION);
        return resultat;
    }

    @BeforeEach
    public void initTest() {
        resultat = createEntity(em);
    }

    @Test
    @Transactional
    public void createResultat() throws Exception {
        int databaseSizeBeforeCreate = resultatRepository.findAll().size();
        // Create the Resultat
        restResultatMockMvc.perform(post("/api/resultats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resultat)))
            .andExpect(status().isCreated());

        // Validate the Resultat in the database
        List<Resultat> resultatList = resultatRepository.findAll();
        assertThat(resultatList).hasSize(databaseSizeBeforeCreate + 1);
        Resultat testResultat = resultatList.get(resultatList.size() - 1);
        assertThat(testResultat.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testResultat.getMention()).isEqualTo(DEFAULT_MENTION);
    }

    @Test
    @Transactional
    public void createResultatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resultatRepository.findAll().size();

        // Create the Resultat with an existing ID
        resultat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResultatMockMvc.perform(post("/api/resultats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resultat)))
            .andExpect(status().isBadRequest());

        // Validate the Resultat in the database
        List<Resultat> resultatList = resultatRepository.findAll();
        assertThat(resultatList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNoteIsRequired() throws Exception {
        int databaseSizeBeforeTest = resultatRepository.findAll().size();
        // set the field null
        resultat.setNote(null);

        // Create the Resultat, which fails.


        restResultatMockMvc.perform(post("/api/resultats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resultat)))
            .andExpect(status().isBadRequest());

        List<Resultat> resultatList = resultatRepository.findAll();
        assertThat(resultatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMentionIsRequired() throws Exception {
        int databaseSizeBeforeTest = resultatRepository.findAll().size();
        // set the field null
        resultat.setMention(null);

        // Create the Resultat, which fails.


        restResultatMockMvc.perform(post("/api/resultats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resultat)))
            .andExpect(status().isBadRequest());

        List<Resultat> resultatList = resultatRepository.findAll();
        assertThat(resultatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllResultats() throws Exception {
        // Initialize the database
        resultatRepository.saveAndFlush(resultat);

        // Get all the resultatList
        restResultatMockMvc.perform(get("/api/resultats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resultat.getId().intValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.intValue())))
            .andExpect(jsonPath("$.[*].mention").value(hasItem(DEFAULT_MENTION.toString())));
    }
    
    @Test
    @Transactional
    public void getResultat() throws Exception {
        // Initialize the database
        resultatRepository.saveAndFlush(resultat);

        // Get the resultat
        restResultatMockMvc.perform(get("/api/resultats/{id}", resultat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(resultat.getId().intValue()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.intValue()))
            .andExpect(jsonPath("$.mention").value(DEFAULT_MENTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingResultat() throws Exception {
        // Get the resultat
        restResultatMockMvc.perform(get("/api/resultats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResultat() throws Exception {
        // Initialize the database
        resultatRepository.saveAndFlush(resultat);

        int databaseSizeBeforeUpdate = resultatRepository.findAll().size();

        // Update the resultat
        Resultat updatedResultat = resultatRepository.findById(resultat.getId()).get();
        // Disconnect from session so that the updates on updatedResultat are not directly saved in db
        em.detach(updatedResultat);
        updatedResultat
            .note(UPDATED_NOTE)
            .mention(UPDATED_MENTION);

        restResultatMockMvc.perform(put("/api/resultats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedResultat)))
            .andExpect(status().isOk());

        // Validate the Resultat in the database
        List<Resultat> resultatList = resultatRepository.findAll();
        assertThat(resultatList).hasSize(databaseSizeBeforeUpdate);
        Resultat testResultat = resultatList.get(resultatList.size() - 1);
        assertThat(testResultat.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testResultat.getMention()).isEqualTo(UPDATED_MENTION);
    }

    @Test
    @Transactional
    public void updateNonExistingResultat() throws Exception {
        int databaseSizeBeforeUpdate = resultatRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResultatMockMvc.perform(put("/api/resultats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resultat)))
            .andExpect(status().isBadRequest());

        // Validate the Resultat in the database
        List<Resultat> resultatList = resultatRepository.findAll();
        assertThat(resultatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteResultat() throws Exception {
        // Initialize the database
        resultatRepository.saveAndFlush(resultat);

        int databaseSizeBeforeDelete = resultatRepository.findAll().size();

        // Delete the resultat
        restResultatMockMvc.perform(delete("/api/resultats/{id}", resultat.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Resultat> resultatList = resultatRepository.findAll();
        assertThat(resultatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
