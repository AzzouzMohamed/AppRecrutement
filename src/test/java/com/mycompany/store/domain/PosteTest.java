package com.mycompany.store.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.store.web.rest.TestUtil;

public class PosteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Poste.class);
        Poste poste1 = new Poste();
        poste1.setId(1L);
        Poste poste2 = new Poste();
        poste2.setId(poste1.getId());
        assertThat(poste1).isEqualTo(poste2);
        poste2.setId(2L);
        assertThat(poste1).isNotEqualTo(poste2);
        poste1.setId(null);
        assertThat(poste1).isNotEqualTo(poste2);
    }
}
