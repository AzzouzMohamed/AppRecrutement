package com.mycompany.store.web.rest;

import com.mycompany.store.Test11App;
import com.mycompany.store.domain.Examin;
import com.mycompany.store.repository.ExaminRepository;

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

/**
 * Integration tests for the {@link ExaminResource} REST controller.
 */
@SpringBootTest(classes = Test11App.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExaminResourceIT {

    private static final String DEFAULT_DOMAINE_DE_COMPETENCE = "AAAAAAAAAA";
    private static final String UPDATED_DOMAINE_DE_COMPETENCE = "BBBBBBBBBB";

    @Autowired
    private ExaminRepository examinRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExaminMockMvc;

    private Examin examin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Examin createEntity(EntityManager em) {
        Examin examin = new Examin()
            .domaineDeCompetence(DEFAULT_DOMAINE_DE_COMPETENCE);
        return examin;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Examin createUpdatedEntity(EntityManager em) {
        Examin examin = new Examin()
            .domaineDeCompetence(UPDATED_DOMAINE_DE_COMPETENCE);
        return examin;
    }

    @BeforeEach
    public void initTest() {
        examin = createEntity(em);
    }

    @Test
    @Transactional
    public void createExamin() throws Exception {
        int databaseSizeBeforeCreate = examinRepository.findAll().size();
        // Create the Examin
        restExaminMockMvc.perform(post("/api/examins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(examin)))
            .andExpect(status().isCreated());

        // Validate the Examin in the database
        List<Examin> examinList = examinRepository.findAll();
        assertThat(examinList).hasSize(databaseSizeBeforeCreate + 1);
        Examin testExamin = examinList.get(examinList.size() - 1);
        assertThat(testExamin.getDomaineDeCompetence()).isEqualTo(DEFAULT_DOMAINE_DE_COMPETENCE);
    }

    @Test
    @Transactional
    public void createExaminWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = examinRepository.findAll().size();

        // Create the Examin with an existing ID
        examin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExaminMockMvc.perform(post("/api/examins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(examin)))
            .andExpect(status().isBadRequest());

        // Validate the Examin in the database
        List<Examin> examinList = examinRepository.findAll();
        assertThat(examinList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDomaineDeCompetenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = examinRepository.findAll().size();
        // set the field null
        examin.setDomaineDeCompetence(null);

        // Create the Examin, which fails.


        restExaminMockMvc.perform(post("/api/examins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(examin)))
            .andExpect(status().isBadRequest());

        List<Examin> examinList = examinRepository.findAll();
        assertThat(examinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExamins() throws Exception {
        // Initialize the database
        examinRepository.saveAndFlush(examin);

        // Get all the examinList
        restExaminMockMvc.perform(get("/api/examins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(examin.getId().intValue())))
            .andExpect(jsonPath("$.[*].domaineDeCompetence").value(hasItem(DEFAULT_DOMAINE_DE_COMPETENCE)));
    }
    
    @Test
    @Transactional
    public void getExamin() throws Exception {
        // Initialize the database
        examinRepository.saveAndFlush(examin);

        // Get the examin
        restExaminMockMvc.perform(get("/api/examins/{id}", examin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(examin.getId().intValue()))
            .andExpect(jsonPath("$.domaineDeCompetence").value(DEFAULT_DOMAINE_DE_COMPETENCE));
    }
    @Test
    @Transactional
    public void getNonExistingExamin() throws Exception {
        // Get the examin
        restExaminMockMvc.perform(get("/api/examins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExamin() throws Exception {
        // Initialize the database
        examinRepository.saveAndFlush(examin);

        int databaseSizeBeforeUpdate = examinRepository.findAll().size();

        // Update the examin
        Examin updatedExamin = examinRepository.findById(examin.getId()).get();
        // Disconnect from session so that the updates on updatedExamin are not directly saved in db
        em.detach(updatedExamin);
        updatedExamin
            .domaineDeCompetence(UPDATED_DOMAINE_DE_COMPETENCE);

        restExaminMockMvc.perform(put("/api/examins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExamin)))
            .andExpect(status().isOk());

        // Validate the Examin in the database
        List<Examin> examinList = examinRepository.findAll();
        assertThat(examinList).hasSize(databaseSizeBeforeUpdate);
        Examin testExamin = examinList.get(examinList.size() - 1);
        assertThat(testExamin.getDomaineDeCompetence()).isEqualTo(UPDATED_DOMAINE_DE_COMPETENCE);
    }

    @Test
    @Transactional
    public void updateNonExistingExamin() throws Exception {
        int databaseSizeBeforeUpdate = examinRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExaminMockMvc.perform(put("/api/examins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(examin)))
            .andExpect(status().isBadRequest());

        // Validate the Examin in the database
        List<Examin> examinList = examinRepository.findAll();
        assertThat(examinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExamin() throws Exception {
        // Initialize the database
        examinRepository.saveAndFlush(examin);

        int databaseSizeBeforeDelete = examinRepository.findAll().size();

        // Delete the examin
        restExaminMockMvc.perform(delete("/api/examins/{id}", examin.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Examin> examinList = examinRepository.findAll();
        assertThat(examinList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
